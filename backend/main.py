from __future__ import annotations

import asyncio
from collections import defaultdict
from datetime import datetime
from typing import Any, Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from stub_data import DEPLOYMENT_STUBS, ENVIRONMENT_STUBS, get_deployment_stub, get_environment_stub

EnvironmentName = Literal["dev", "qa", "uat"]
ENVIRONMENTS: tuple[EnvironmentName, ...] = ("dev", "qa", "uat")

app = FastAPI(
    title="Developer Platform Demo BFF",
    description="Backend-stubbed APIs for the Developer Platform portfolio demo.",
    version="2.0.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Demo only. Restrict origins in production.
    allow_methods=["GET"],
    allow_headers=["*"],
)


def api_response(body: Any, message: str = "Success") -> dict[str, Any]:
    return {"status": 200, "response_body": body, "response_message": message}


def validate_environment(environment: str) -> str:
    normalized = environment.lower()
    if normalized not in ENVIRONMENT_STUBS:
        raise HTTPException(status_code=404, detail=f"Unknown environment: {environment}")
    return normalized


async def read_environment_stub(environment: str) -> dict[str, Any]:
    """Simulate the environment microservice checking a pre-provisioned server."""
    normalized = validate_environment(environment)
    await asyncio.sleep(0.08)
    result = get_environment_stub(normalized)
    services = result.pop("services")
    running = sum(service["status"] == "running" for service in services)
    degraded = sum(service["status"] == "degraded" for service in services)
    result["services"] = {
        "total": len(services),
        "running": running,
        "degraded": degraded,
        "details": services,
    }
    return result


async def read_deployment_stub(environment: str) -> dict[str, Any]:
    """Simulate the deployment service querying its persistence layer."""
    normalized = validate_environment(environment)
    await asyncio.sleep(0.08)
    deployments = get_deployment_stub(normalized)
    successful = sum(item["status"] == "success" for item in deployments)
    failed = sum(item["status"] == "failed" for item in deployments)
    in_progress = sum(item["status"] == "in_progress" for item in deployments)
    return {
        "environment": normalized.upper(),
        "summary": {
            "total": len(deployments),
            "successful": successful,
            "failed": failed,
            "in_progress": in_progress,
        },
        "deployments": deployments,
    }


@app.get("/api/health")
async def health() -> dict[str, str]:
    return {"status": "healthy"}


@app.get("/api/environment/details/{environment}")
async def get_environment_details(environment: str) -> dict[str, Any]:
    return api_response(await read_environment_stub(environment))


@app.get("/api/deployment/details/{environment}")
async def get_deployment_details(environment: str) -> dict[str, Any]:
    return api_response(await read_deployment_stub(environment))


@app.get("/api/dev-platform-dashboard")
async def get_dashboard() -> dict[str, Any]:
    """BFF endpoint that aggregates backend endpoint stubs in parallel."""
    environment_results, deployment_results = await asyncio.gather(
        asyncio.gather(*(read_environment_stub(name) for name in ENVIRONMENTS)),
        asyncio.gather(*(read_deployment_stub(name) for name in ENVIRONMENTS)),
    )

    environments: list[dict[str, Any]] = []
    all_deployments: list[dict[str, Any]] = []

    for environment, deployment_result in zip(environment_results, deployment_results):
        environment["deployments"] = deployment_result["summary"]
        environments.append(environment)
        for deployment in deployment_result["deployments"]:
            deployment["environment"] = environment["key"]
            all_deployments.append(deployment)

    # Stub timestamps are formatted consistently, so sort by their explicit source order
    # after combining, using the deployment ID timestamp segment.
    all_deployments.sort(key=lambda item: item["id"], reverse=True)

    trend: dict[str, dict[str, int]] = defaultdict(lambda: {"successful": 0, "failed": 0})
    for deployment in all_deployments:
        trend[deployment["day"]]["successful" if deployment["status"] == "success" else "failed"] += 1

    day_order = ["Jul 10", "Jul 11", "Jul 12", "Jul 13", "Jul 14", "Jul 15", "Jul 16"]
    deployment_trend = [
        {"day": day, "successful": trend[day]["successful"], "failed": trend[day]["failed"]}
        for day in day_order
    ]

    degraded_environments = [
        env["key"] for env in environments if env["services"]["degraded"] > 0
    ]
    activity_feed = [
        {
            "type": "success",
            "title": f"Deployment {all_deployments[0]['id']} to {all_deployments[0]['environment']} completed successfully",
            "timestamp": "5 minutes ago",
        },
        *[
            {
                "type": "warning",
                "title": f"One service in {environment} is degraded",
                "timestamp": f"{index + 1} hour ago",
            }
            for index, environment in enumerate(degraded_environments)
        ],
        {
            "type": "success",
            "title": "Health check completed for all environments",
            "timestamp": "2 hours ago",
        },
    ]

    return api_response(
        {
            "generated_at": datetime.now().astimezone().isoformat(),
            "date_range": {"label": "Last 7 days", "start": "2026-07-10", "end": "2026-07-16"},
            "environments": environments,
            "recent_deployments": all_deployments[:5],
            "deployment_trend": deployment_trend,
            "activity_feed": activity_feed,
        }
    )
