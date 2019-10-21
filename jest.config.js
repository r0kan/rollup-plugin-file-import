module.exports = {
  cacheDirectory: '<rootDir>/jest-cache',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['js'],
  modulePaths: ['<rootDir>/src'],
  testMatch: ['<rootDir>/src/**/__tests__/**/*.spec.js'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|ts)$': 'babel-jest',
  },
};
