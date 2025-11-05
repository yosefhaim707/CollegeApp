# Adding a Data Adapter

1. Create a new class that implements `Adapter` from `apps/server/src/services/adapters/base-adapter.ts`.
2. Leverage `Bottleneck` for rate limiting and wrap remote calls with Redis caching if appropriate.
3. Register the adapter inside `apps/server/src/jobs/sync.ts` by appending it to the `adapters` array.
4. Provide fallback behavior so the sync job remains idempotent even when the upstream service is unavailable.
5. Update tests in `apps/server/tests` to cover the new adapter with mocked HTTP responses.
