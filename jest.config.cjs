module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@env$': '<rootDir>/src/__mocks__/@env/index.cjs',
  },
  testMatch: ['<rootDir>/src/**/__tests__/**/*.test.ts'],
};
