# AB Test Service

A small Koa and PostgreSQL service for creating experiments and assigning a stable variant to each user.

## Run with Docker Compose

Copy `.env.example` to `.env`, replace the development secrets, then start the service:

```sh
docker compose up --build
```

The app waits for PostgreSQL, runs the SQL migration, and listens on `http://localhost:3000`. The `/health` endpoint checks both the app and database.

## API

Create an experiment. `variantCount` must be `2` or `3`; timestamps must include a timezone.

```sh
curl -X POST http://localhost:3000/experiments \
  -H 'content-type: application/json' \
  -H 'x-admin-api-key: local-dev-change-me' \
  -d '{"startsAt":"2026-10-10T09:00:00Z","endsAt":"2026-10-17T09:00:00Z","variantCount":2}'
```

Get a user's variant for an experiment:

```sh
curl -X POST http://localhost:3000/experiments/EXPERIMENT_ID/variant \
  -H 'content-type: application/json' \
  -d '{"userId":"user-123"}'
```

The response is `{ "variant": 0 }` when the experiment is not active, or a stable assignment from `1` through the configured variant count. Assignments are stored under a unique `(experiment_id, user_id)` key, so concurrent requests for the same user converge on the same saved variant.

Variant selection is random and does not enforce exact balance. Across large samples, the proportions are expected to approach an even split.

## Local development

Run PostgreSQL with `docker compose up -d db`, install dependencies with `npm install`, copy `.env.example` to `.env`, then run `npm run migrate` and `npm run dev`. The local dev server defaults to port `3001` so it can run alongside the Compose app on port `3000`; override this with `PORT` if needed.

The API key and database credentials in the example are for local development only. Set strong values before exposing the service outside a trusted environment.