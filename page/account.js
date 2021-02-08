import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Login  from './login'
import ResetPWD from './resetpwd'
import Signup from './signup'
import NotificationPage from './notification';
import ScanPage from './ScanPage'
import Welcome from './welcome'
import Profile from "./profile";
import DetailInfo from './detailProduct';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

class Account extends React.Component {
  
    render(){
      return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} mode="modal">
                <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
                <Stack.Screen name="Sign Up" component={Signup} />
                <Stack.Screen name="Reset Password" component={ResetPWD} />
                <Stack.Screen name="notification" component={NotificationPage} />
                <Stack.Screen name="scan" component={ScanPage} />
                <Stack.Screen name="detail" component={DetailInfo} />

            </Stack.Navigator>
        </NavigationContainer>
      )}
    }

export default Account;