const ApiAuth = {
  getMe: async () => {
    // Simulate an API call to get user information
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({id: 1, name: "John Doe"});
      }, 1000);
    });
  },
};

export default ApiAuth;
