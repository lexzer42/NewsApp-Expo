import { ActivityIndicator, Text } from 'react-native-paper';

export const Loading = () => (
  <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />
);

export const ErrorMessage = ({ message }: { message: string }) => (
  <Text style={{ color: 'red', textAlign: 'center', margin: 20 }}>Error: {message}</Text>
);

export const EmptyState = ({ message }: { message: string }) => (
  <Text style={{ textAlign: 'center', margin: 20, fontSize: 16 }}>📭 {message}</Text>
);
