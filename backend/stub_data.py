from __future__ import annotations

from copy import deepcopy
from typing import Any

ENVIRONMENT_STUBS: dict[str, dict[str, Any]] = {
    "dev": {
        "key": "DEV",
        "status": "active",
        "deployment_target": "ubuntu-dev-01",
        "services": [
            {"name": "market-api", "status": "running", "response_time_ms": 92},
            {"name": "auth-service", "status": "running", "response_time_ms": 81},
            {"name": "notification-service", "status": "running", "response_time_ms": 105},
        ],
    },
    "qa": {
        "key": "QA",
        "status": "active",
        "deployment_target": "ubuntu-qa-01",
        "services": [
            {"name": "market-api", "status": "running", "response_time_ms": 118},
            {"name": "auth-service", "status": "running", "response_time_ms": 109},
            {"name": "notification-service", "status": "degraded", "response_time_ms": 488},
        ],
    },
    "uat": {
        "key": "UAT",
        "status": "active",
        "deployment_target": "ubuntu-uat-01",
        "services": [
            {"name": "market-api", "status": "running", "response_time_ms": 136},
            {"name": "auth-service", "status": "running", "response_time_ms": 121},
            {"name": "notification-service", "status": "degraded", "response_time_ms": 526},
        ],
    },
}

DEPLOYMENT_STUBS: dict[str, list[dict[str, Any]]] = {
    "dev": [
        {"id": "DEP-20260716-1015", "application": "market-api", "version": "v1.2.3", "commit": "a1b2c3d", "status": "success", "deployed_at": "Jul 16, 2026 10:15 AM", "triggered_by": "Alex Garcia", "day": "Jul 16"},
        {"id": "DEP-20260714-1410", "application": "auth-service", "version": "v1.1.0", "commit": "f22ab91", "status": "success", "deployed_at": "Jul 14, 2026 2:10 PM", "triggered_by": "Alex Garcia", "day": "Jul 14"},
        {"id": "DEP-20260711-0905", "application": "notification-service", "version": "v1.0.5", "commit": "c03df81", "status": "success", "deployed_at": "Jul 11, 2026 9:05 AM", "triggered_by": "Maria Santos", "day": "Jul 11"},
    ],
    "qa": [
        {"id": "DEP-20260716-0930", "application": "market-api", "version": "v1.2.3", "commit": "a1b2c3d", "status": "failed", "deployed_at": "Jul 16, 2026 9:30 AM", "triggered_by": "Alex Garcia", "day": "Jul 16"},
        {"id": "DEP-20260715-1510", "application": "notification-service", "version": "v1.1.2", "commit": "d4e5f6a", "status": "failed", "deployed_at": "Jul 15, 2026 3:10 PM", "triggered_by": "John Doe", "day": "Jul 15"},
        {"id": "DEP-20260714-1030", "application": "auth-service", "version": "v1.1.0", "commit": "f22ab91", "status": "success", "deployed_at": "Jul 14, 2026 10:30 AM", "triggered_by": "Maria Santos", "day": "Jul 14"},
        {"id": "DEP-20260712-1345", "application": "market-api", "version": "v1.2.2", "commit": "9f22aa0", "status": "success", "deployed_at": "Jul 12, 2026 1:45 PM", "triggered_by": "Alex Garcia", "day": "Jul 12"},
        {"id": "DEP-20260710-1115", "application": "notification-service", "version": "v1.1.1", "commit": "11acd20", "status": "success", "deployed_at": "Jul 10, 2026 11:15 AM", "triggered_by": "John Doe", "day": "Jul 10"},
    ],
    "uat": [
        {"id": "DEP-20260715-1630", "application": "market-api", "version": "v1.2.2", "commit": "f4e5d6c", "status": "success", "deployed_at": "Jul 15, 2026 4:30 PM", "triggered_by": "Maria Santos", "day": "Jul 15"},
        {"id": "DEP-20260714-1125", "application": "auth-service", "version": "v1.0.8", "commit": "b7c8d9e", "status": "success", "deployed_at": "Jul 14, 2026 11:25 AM", "triggered_by": "Alex Garcia", "day": "Jul 14"},
        {"id": "DEP-20260713-1600", "application": "notification-service", "version": "v1.0.9", "commit": "87ea923", "status": "failed", "deployed_at": "Jul 13, 2026 4:00 PM", "triggered_by": "John Doe", "day": "Jul 13"},
        {"id": "DEP-20260712-0940", "application": "market-api", "version": "v1.2.1", "commit": "21fae92", "status": "success", "deployed_at": "Jul 12, 2026 9:40 AM", "triggered_by": "Maria Santos", "day": "Jul 12"},
        {"id": "DEP-20260711-1445", "application": "auth-service", "version": "v1.0.7", "commit": "15ce027", "status": "failed", "deployed_at": "Jul 11, 2026 2:45 PM", "triggered_by": "Alex Garcia", "day": "Jul 11"},
    ],
}


def get_environment_stub(environment: str) -> dict[str, Any]:
    return deepcopy(ENVIRONMENT_STUBS[environment.lower()])


def get_deployment_stub(environment: str) -> list[dict[str, Any]]:
    return deepcopy(DEPLOYMENT_STUBS[environment.lower()])
