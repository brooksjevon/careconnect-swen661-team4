module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/integration/**/*.integration.test.cjs'],
  collectCoverageFrom: [
    'electron/**/*.cjs',
  ],
  coverageDirectory: 'coverage/integration',
  coverageReporters: [
    'text',
    'html',
    'lcov',
  ],
}
