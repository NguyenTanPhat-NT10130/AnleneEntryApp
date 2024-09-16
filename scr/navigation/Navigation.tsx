import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/WelcomeScreen';
import BodyTestScreen from '../screens/BodyTestScreen';
import TestResultsScreen from '../screens/TestResultsScreen';
import Solution from '../screens/SolutionScreen';
import Voucher from '../screens/VoucherScreen';
import Information from '../screens/InformationScreen';
export type RootStackParamList = {
    Welcome: undefined;
    BodyTest: undefined;
    TestResults: undefined;
    Solution: undefined;
    Voucher: undefined;
    Information: undefined;
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
                <Stack.Screen name="Voucher" component={Voucher} options={{ headerShown: false }}/>
                <Stack.Screen name="Information" component={Information} options={{ headerShown: false }}/> 
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
