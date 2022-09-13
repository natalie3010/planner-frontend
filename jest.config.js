module.exports = {
  // It suggests that the framework must automatically clean mock calls and instances between each test
  clearMocks: true,
  // It shows whether or not it have to have the coverage data collected while executing the test
  collectCoverage: false,
  // This configuration indicates the Jest which take a look at  test environment it need to use for the testing run
  testEnvironment: 'jsdom',
  // It indicates that an array of glob patterns indicating a hard and fast of files for which insurance statistics ought to be collected
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!**/__MOCKS__/**'],
  // It indicates the directory in which Jest ought to output its coverage documents and test files
  coverageDirectory: 'coverage',
  // This property shows that an array of regexp sample strings used to skip the test coverage collection
  coveragePathIgnorePatterns: ['/node_modules/', 'dist', '<rootDir>/src/__tests__'],
  // Jest
  // This property shows that an item that configures minimal threshold enforcement for coverage reports
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/src/__mocks__/svgrMock.js',
    '\\.(jpg|jpeg|png)$': '<rootDir>/src/__mocks__/fileMock.js',
  },
}
