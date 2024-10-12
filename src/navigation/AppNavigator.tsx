import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import Dashboard from '../screens/Dashboard';
import VerifyCode from '../screens/VerifyCode';
import Rainfallpred from '../screens/Rainfallpred';
import Yieldpred from '../screens/Yieldpred';
import Croppred from '../screens/Croppred';

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    SignUp: undefined;
    Dashboard: undefined;
    VerifyCode: { phoneNumber: string; confirmation: any };
    Rainfallpred:undefined;
    Yieldpred:undefined;
    Croppred:undefined;

};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Dashboard" component={Dashboard}  />
                <Stack.Screen name="VerifyCode" component={VerifyCode} />
                <Stack.Screen name="Rainfallpred" component={Rainfallpred} />
                <Stack.Screen name="Yieldpred" component={Yieldpred} />
                <Stack.Screen name="Croppred" component={Croppred} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
