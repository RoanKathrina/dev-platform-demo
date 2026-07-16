# Developer Platform Dashboard Demo

A React dashboard portfolio project for a developer self-service platform. The only implemented page is **Dashboard**; Environments, Deployments, and Audit Logs are intentionally empty placeholders.

## Demo data

- DEV: 1 deployment target, 3 deployments, 3 successful, 3 services, 3 running
- QA: 1 deployment target, 5 deployments, 3 successful, 2 failed, 3 services, 2 running, 1 degraded
- UAT: 1 deployment target, 5 deployments, 3 successful, 2 failed, 3 services, 2 running, 1 degraded

Totals shown on the dashboard:

- 3 environments
- 9 services: 7 healthy/running, 2 degraded
- 13 deployments over 7 days
- 9 successful deployments
- 4 failed deployments

## Run the React application

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Stub strategy

`src/services/dashboardService.js` returns a Promise containing the mock BFF response. The component calls it exactly as it would call a real asynchronous backend service.

To switch to a real or mock FastAPI endpoint, change:

```js
getDashboard({ useStub: true })
```

to:

```js
getDashboard({ useStub: false })
```

## Optional FastAPI mock BFF

```bash
cd mock-backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## Important implementation decisions

- The parent Dashboard page owns fetching, loading, and error state.
- Child cards receive normalized data through props.
- Child components do **not** use `useEffect` to recompute values.
- `useMemo` is used only for derived aggregate totals.
- One BFF endpoint supports the entire dashboard.
- The frontend has no knowledge of downstream microservice topology.
