// Auth0 configuration
// In a real application, these values would come from environment variables

export const auth0Config = {
  domain: process.env.AUTH0_DOMAIN || 'your-auth0-domain.auth0.com',
  clientId: process.env.AUTH0_CLIENT_ID || 'your-auth0-client-id',
  clientSecret: process.env.AUTH0_CLIENT_SECRET || 'your-auth0-client-secret',
  audience: process.env.AUTH0_AUDIENCE || 'your-auth0-api-identifier',
  redirectUri: process.env.AUTH0_REDIRECT_URI || 'http://localhost:3000/api/auth/callback',
  postLogoutRedirectUri: process.env.AUTH0_POST_LOGOUT_REDIRECT_URI || 'http://localhost:3000',
  session: {
    cookieSecret: process.env.AUTH0_SESSION_COOKIE_SECRET || 'your-session-cookie-secret',
    cookieLifetime: parseInt(process.env.AUTH0_SESSION_COOKIE_LIFETIME || '7200', 10),
    storeIdToken: true,
    storeAccessToken: true,
    storeRefreshToken: true,
  },
};

export default auth0Config;