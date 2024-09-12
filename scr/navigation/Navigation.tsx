import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/WelcomeScreen';
import BodyTestScreen from '../screens/BodyTestScreen';
import TestResultsScreen from '../screens/TestResultsScreen';
import Solution from '../screens/SolutionScreen';
export type RootStackParamList = {
    Welcome: undefined;
    BodyTest: undefined;
    TestResults: undefined;
    Solution: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
                <Stack.Screen name="BodyTest" component={BodyTestScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="TestResults" component={TestResultsScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Solution" component={Solution} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
