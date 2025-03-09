import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

// Screens
import NewsList from '../components/NewsList';
import DetailScreen from '../screens/DetailScreen';
import SavedNewsScreen from '../screens/SavedNewScreen';
import CategoriesScreen from '../screens/CategoriesScreen';

// Types
import { RootStackParamList, HomeTabParamList } from '../interfaces/news';


const Tab = createBottomTabNavigator<HomeTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

function HomeTabs() {
    const theme = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'News') {
                        iconName = focused ? 'newspaper' : 'newspaper-outline';
                    } else if (route.name === 'Categories') {
                        iconName = focused ? 'list' : 'list-outline';
                    } else if (route.name === 'Saved') {
                        iconName = focused ? 'bookmark' : 'bookmark-outline';
                    }
                    return <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={size} color={color} />;
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="News" component={NewsList} options={{ title: 'Últimas Noticias' }} />
            <Tab.Screen name="Categories" component={CategoriesScreen} options={{ title: 'Categorías' }} />
            <Tab.Screen name="Saved" component={SavedNewsScreen} options={{ title: 'Guardados' }} />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    const theme = useTheme();

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.primary,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                cardStyle: { backgroundColor: theme.colors.background },
            }}
        >
            <Stack.Screen
                name="HomeTabs"
                component={HomeTabs}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={{ title: 'Detalle' }}
            />
        </Stack.Navigator>
    );
}