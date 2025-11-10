# API Rate Limits

The epilot API implements rate limiting to ensure fair usage and maintain service quality for all users.

## Rate Limit Response

When rate limits are exceeded, the Entity API responds with:

```
HTTP 429 - Too Many Requests
```

The response includes a `Retry-After` header indicating the number of seconds until the quota is reset. You should implement retry logic based on this header value.

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

When implementing API integrations:

1. **Implement retry logic**: Use the `Retry-After` header value to determine when to retry failed requests
2. **Batch operations**: Use dedicated batching APIs to process multiple operations efficiently:
   - [ERP Integration API](https://docs.epilot.io/api/erp-integration) - Optimized for bulk data synchronization with higher rate limits
   - [Batch API](https://docs.epilot.io/api/batch) - Process multiple entity operations in a single request with higher rate limits
3. **Cache responses**: Cache GET request responses to reduce unnecessary API calls
4. **Monitor usage**: Track your API usage patterns to stay within quota limits
5. **Use webhooks**: For real-time updates, use webhooks instead of polling endpoints

## Contact

If you need higher rate limits for your integration, please contact epilot support to discuss your use case.
