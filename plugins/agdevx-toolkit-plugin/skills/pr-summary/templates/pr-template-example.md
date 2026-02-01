# Summary
This PR implements user authentication with JWT tokens and adds password reset functionality. These changes address security requirements from issue #123 and improve the user experience during account recovery.

# Motivation
We needed to improve our security to protect user data.

# Breaking Changes
- Auth header format changed from Bearer to JWT (requires frontend update)

# Technical Details
Implemented JWT authentication using HS256 algorithm with 15-minute access tokens and 7-day refresh tokens. Password reset generates a time-limited token sent via email. Added Redis for token blacklisting on logout.

# ✨ Features Added/Updated/Removed
- JWT-based authentication system with refresh tokens
- Password reset flow with email verification
- Rate limiting on auth endpoints

# 🐛 Bugs Fixed
- Fixed session persistence issue on page reload
- Corrected password validation to match requirements

# 📝 Documentation Updates
- Updated API docs with new auth endpoints
- Added authentication flow diagram

# Testing
- Added unit tests for token generation and validation
- Integration tests for full auth flow
- Tested password reset email delivery in staging

# Files Changed
- `src/auth/jwt.ts` - JWT token generation and validation logic
- `src/routes/auth.ts` - New auth endpoints (login, logout, refresh, reset)
- `src/middleware/auth.ts` - Authentication middleware
- `tests/auth.test.ts` - Comprehensive auth test suite

# Commits
- feat: implement JWT authentication system
- feat: add password reset functionality
- fix: session persistence on page reload
- docs: update API documentation
- test: add auth integration tests