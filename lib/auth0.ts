// Mock Auth0 configuration for demonstration purposes
// In a real application, you would configure the actual Auth0 SDK

export const auth0 = {
  // Mock authentication methods
  login: async (email: string, password: string) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '1',
            email,
            name: 'John Doe',
          },
          token: 'mock-jwt-token',
        });
      }, 500);
    });
  },

  logout: async () => {
    // Simulate logout
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Logged out successfully' });
      }, 300);
    });
  },

  // Mock user management methods
  getUser: async (token: string) => {
    // Simulate API call to get user info
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: '1',
          email: 'john@example.com',
          name: 'John Doe',
        });
      }, 300);
    });
  },

  // Mock session management
  getSession: async () => {
    // Check if user has a valid session
    const token = localStorage.getItem('auth-token');
    if (!token) return null;

    // Simulate token validation
    return {
      user: {
        id: '1',
        email: 'john@example.com',
        name: 'John Doe',
      },
      token,
    };
  },

  // Mock authorization methods
  requireAuthentication: async () => {
    // Check if user is authenticated
    const session = await auth0.getSession();
    return !!session;
  },
};

export default auth0;