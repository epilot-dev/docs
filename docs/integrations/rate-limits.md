# API Rate Limits

The epilot API enforces rate limits to ensure fair usage and consistent service quality.

## Rate Limit Response

When you exceed a rate limit, the API responds with:

```
HTTP 429 - Too Many Requests
```

The `Retry-After` header indicates how many seconds until the quota resets. Implement retry logic based on this value.

## Default Quotas

Rate limits are applied per organization and reset every minute:

| Operation | Limit | Window |
|-----------|-------|--------|
| Entity API mutations (POST, PUT, PATCH, DELETE) | 500 requests | per minute |
| Entity searches | 5,000 requests | per minute |

## Exemptions

The following requests are **not** subject to rate limiting:

- `GET` requests (read operations)
- `OPTIONS` requests
- Internal API calls between epilot services

## Best Practices

1. **Implement retry logic** — Use the `Retry-After` header to determine when to retry
2. **Batch operations** — Use dedicated batching APIs for bulk processing:
   - [ERP Integration API](https://docs.epilot.io/api/erp-integration) — Optimized for bulk data sync with higher limits
   - [Batch API](https://docs.epilot.io/api/batch) — Process multiple entity operations per request
3. **Cache responses** — Cache GET responses to reduce unnecessary API calls
4. **Monitor usage** — Track API usage patterns to stay within quotas
5. **Use webhooks** — Subscribe to events instead of polling endpoints

## Higher Limits

Contact epilot support if your integration requires higher rate limits.
