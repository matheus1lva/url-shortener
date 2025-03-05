// Increase the default timeout for all tests
jest.setTimeout(60000);

// Mock nanoid module
jest.mock('nanoid', () => {
  return {
    nanoid: (size = 21) => {
      const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < size; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    },
  };
});

// Silence console logs during tests if needed
// console.log = jest.fn();
// console.error = jest.fn();
// console.warn = jest.fn();
