# Keel journey demo

A fictional, disposable application for validating Keel’s real repository → reference → preview → share → compare workflow. It is not a production application.

All sample tasks and branding are fictional. The application has no accounts, database, secrets, background jobs, analytics, external services, or saved user changes. Requests are served by the Node.js standard library with no package dependencies.

## Two ideas

- `main`: the original Harbor weekly plan, with a simple task list.
- `codex/focused-plan`: a candidate with a different headline and call to action, plus a more focused first task.

## Run locally

```sh
npm start
```

Open `http://localhost:3000`. `GET /health` returns the version and health status. `PORT` defaults to 3000; `HOST` defaults to `0.0.0.0` for container use. Set `HOST=127.0.0.1` for a loopback-only local process.

## Keel configuration

Use the root `Dockerfile`, container port `3000`, and health path `/health`. The image runs as the unprivileged `node` user. Its official Node base image is pinned by digest.

Keel’s existing-host lane requires separately provisioned baseline and UAT environment files; an isolated candidate needs its own separate file. For this fixture each file can contain only `PORT=3000`. No credentials or customer data are needed. Public test URLs intentionally expose only this fictional content.

This repository does not provision infrastructure. Stop or remove the validation environments after the journey. No analytics instrumentation is included: do not interpret this fixture as measured A/B results.
