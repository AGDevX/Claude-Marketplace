# Summary
Adds JWT authentication with refresh tokens and a password reset flow via email. Addresses security requirements from #123.

# Breaking Changes
- Auth header format changed from `Bearer` to `JWT` (requires frontend update)

# Changes
- **Auth system**: JWT auth with 15-min access tokens, 7-day refresh tokens, Redis-backed token blacklisting on logout
- **Password reset**: Time-limited token sent via email, full verification flow
- **Rate limiting**: Added to all auth endpoints
- **Bug fixes**: Session persistence on page reload, password validation matching requirements

# Approach
Chose HS256 for JWT signing — simpler than RS256 and sufficient since we control both issuer and consumer. Redis for token blacklisting keeps logout instant without waiting for token expiry.

# Testing
Unit tests for token logic, integration tests for full auth flow, password reset email verified in staging.
