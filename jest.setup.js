import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// Mock para react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const ReactNative = jest.requireActual('react-native');
  return {
    ...ReactNative,
    GestureHandlerRootView: ({ children }) => ReactNative.View({ children }),
  };
});

// Mock para AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// Mock global para fetch
global.fetch = require('jest-fetch-mock');