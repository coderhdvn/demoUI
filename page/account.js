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
import LoginWithGoogle from './LoginWithGoogle';
import SearchProduct from './SearchProduct';
import Chat from './ChatService';
import Batch from './batch';
import BatchHistory from './batchHistory';
import { Block } from './block';
import { FalseResult, Point, PrivateScan, Question1, Question2, Result } from './question';

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
                <Stack.Screen name="batch" component={Batch} />
                <Stack.Screen name="distributors" component={Distributors} />
                <Stack.Screen name="map" component={GGMap} />
                <Stack.Screen name="history" component={History} />
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="LoginWithGoogle" component={LoginWithGoogle} />
                <Stack.Screen name="Search Product" component={SearchProduct} />
                <Stack.Screen name="Chat" component={Chat} />
                <Stack.Screen name="BatchHistory" component={BatchHistory} />
                <Stack.Screen name="Block" component={Block} />
                <Stack.Screen name="Question1" component={Question1} />
                <Stack.Screen name="Question2" component={Question2} />
                <Stack.Screen name="PrivateScan" component={PrivateScan} />
                <Stack.Screen name="Result" component={Result} />
                <Stack.Screen name="FalseResult" component={FalseResult} />
                <Stack.Screen name="Point" component={Point} />
            </Stack.Navigator>
        </NavigationContainer>
      )}
    }

export default Account;