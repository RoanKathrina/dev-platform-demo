# Developer Platform Demo Architecture

```mermaid
flowchart TD
    UI[React Dashboard] -->|GET /api/dev-platform-dashboard| BFF[FastAPI BFF]
    BFF -->|parallel| EDEV[Environment Stub: DEV]
    BFF -->|parallel| EQA[Environment Stub: QA]
    BFF -->|parallel| EUAT[Environment Stub: UAT]
    BFF -->|parallel| DDEV[Deployment Stub: DEV]
    BFF -->|parallel| DQA[Deployment Stub: QA]
    BFF -->|parallel| DUAT[Deployment Stub: UAT]
    EDEV --> BFF
    EQA --> BFF
    EUAT --> BFF
    DDEV --> BFF
    DQA --> BFF
    DUAT --> BFF
    BFF -->|normalized dashboard DTO| UI
```

## Boundary

- React owns rendering, routing, loading state, and error state.
- React does not contain sample platform data.
- FastAPI owns dummy endpoint responses and dashboard aggregation.
- The endpoint contracts can later be backed by real environment and deployment microservices.
