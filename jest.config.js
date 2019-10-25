module.exports = {
  cacheDirectory: '<rootDir>/jest/cache',
  roots: ['<rootDir>/test'],
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['<rootDir>/test/**/*.spec.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/jest/__mocks__/imageMock.js',
  },
};
