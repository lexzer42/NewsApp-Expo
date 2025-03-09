import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import fetchMock from 'jest-fetch-mock';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// Setup fetch mock
fetchMock.enableMocks();

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const ReactNative = jest.requireActual('react-native');
  return {
    ...ReactNative,
    GestureHandlerRootView: ({ children }) => ReactNative.View({ children }),
  };
});

// Mock environment variables
jest.mock('@env', () => ({
  NEWS_API_BASE_URL: 'https://newsapi.org/v2',
  NEWS_API_KEY: '9818971a47af477182cc098ac4bc9933', // random number for mockup api key
  APP_ENV: 'test',
  EXPO_OS: 'android'
}));

// Mock Linking
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(() => Promise.resolve()),
}));