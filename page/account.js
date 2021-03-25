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
import DetailInfo from './detailInfo';
import GGMap from './DistributionRoute';
import History from './history';

import { NavigationContainer } from '@react-navigation/native';
import Main from './main';
import Distributors from './Distributors';

const Stack = createStackNavigator();

class Account extends React.Component {
  
    render(){
      return (
       <NavigationContainer>
            <Stack.Navigator initialRouteName={this.props.wasLogedIn?"Main":"Login"} screenOptions={{ headerShown: false }} mode="modal">
                <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
                <Stack.Screen name="Sign Up" component={Signup} />
                <Stack.Screen name="Reset Password" component={ResetPWD} />
                <Stack.Screen name="notification" component={NotificationPage} />
                <Stack.Screen name="ScanPage" component={ScanPage} />
                <Stack.Screen name="detail" component={DetailInfo} />
                <Stack.Screen name="distributors" component={Distributors} />
                <Stack.Screen name="map" component={GGMap} />
                <Stack.Screen name="history" component={History} />
                <Stack.Screen name="Main" component={Main} />
            </Stack.Navigator>
        </NavigationContainer>
      )}
    }

export default Account;