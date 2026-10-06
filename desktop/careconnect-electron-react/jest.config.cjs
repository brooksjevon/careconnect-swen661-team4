module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/renderer/src'],
  testMatch: ['**/__tests__/**/*.(test|spec).(js|jsx)'],
  transform: {
    '^.+\\.[jt]sx?$': ['babel-jest', { configFile: './babel.config.cjs' }]
  },
  setupFilesAfterEnv: ['<rootDir>/renderer/src/test/setupTests.js'],
  moduleFileExtensions: ['js', 'jsx'],
  collectCoverageFrom: [
    'renderer/src/**/*.{js,jsx}',
    '!renderer/src/main.jsx',
    '!renderer/src/data/**'
  ],
  coverageDirectory: 'coverage'
}
