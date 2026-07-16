# Backend stub APIs

The frontend contains no dashboard data stub. It always calls the FastAPI BFF:

- `GET /api/dev-platform-dashboard`

The BFF aggregates backend endpoint stubs:

- `GET /api/environment/details/dev`
- `GET /api/environment/details/qa`
- `GET /api/environment/details/uat`
- `GET /api/deployment/details/dev`
- `GET /api/deployment/details/qa`
- `GET /api/deployment/details/uat`

The stub data lives in `stub_data.py`. Replace the implementations of
`read_environment_stub` and `read_deployment_stub` later with real service clients.
