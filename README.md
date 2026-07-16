# Developer Platform Dashboard Demo

A React + FastAPI portfolio demo for a developer self-service platform. The Dashboard is implemented; Environments, Deployments, and Audit Logs remain placeholders.

## Architecture used by this package

```text
React Dashboard
      |
      | GET /api/dev-platform-dashboard
      v
FastAPI BFF
      |
      +-- environment endpoint stubs: DEV, QA, UAT
      +-- deployment endpoint stubs: DEV, QA, UAT
      |
      v
Normalized dashboard response
```

**The frontend contains no dashboard stub.** Dummy environment and deployment responses are generated only in the backend.

## Demo data

| Environment | Deployments | Successful | Failed | Services | Running | Degraded |
|---|---:|---:|---:|---:|---:|---:|
| DEV | 3 | 3 | 0 | 3 | 3 | 0 |
| QA | 5 | 3 | 2 | 3 | 2 | 1 |
| UAT | 5 | 3 | 2 | 3 | 2 | 1 |

## Run in two terminals

### Terminal 1 — FastAPI backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API documentation: `http://localhost:8000/docs`

### Terminal 2 — React frontend

```bash
npm config set registry https://registry.npmjs.org/
npm install
npm run dev
```

Open `http://localhost:5173`. Vite proxies `/api` requests to FastAPI on port 8000.

## Frontend behavior

`src/services/dashboardService.js` performs a normal `fetch` call:

```js
fetch('/api/dev-platform-dashboard')
```

It has no `useStub` switch and no hard-coded dashboard data.

## Backend extension point

For the demo, these functions return backend stubs:

- `read_environment_stub(environment)`
- `read_deployment_stub(environment)`

Later, replace their internals with HTTP clients, SSH/Docker health checks, database queries, or dedicated microservice integrations. The React contract does not need to change.
