module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/jest.setup.cjs'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-gesture-handler|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg))'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '@env': '<rootDir>/__mocks__/env.js',
    '@react-native-async-storage/async-storage': '<rootDir>/__mocks__/@react-native-async-storage/async-storage.js'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/types/**',
    '!**/babel.config.js',
    '!**/jest.setup.cjs',
    '!**/jest.config.js',
  ],
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/__test__/**/*.[jt]s?(x)", 
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  testEnvironment: 'node'
};