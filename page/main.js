/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  Button,
  Text,
  SafeAreaView,
  View,
  Image
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login  from './login'
import ResetPWD from './resetpwd'
import Signup from './signup'
import NotificationPage from './notification';
import ScanPage from './ScanPage'
import Welcome from './welcome'
import Profile from "./profile";
import DetailInfo from './detailInfo';
import {Icon} from 'react-native-elements'

import DistributionRoute from './DistributionRoute'
import UserInfo from './userInfo';
import { BASIC_COLOR } from '../constants/Constant';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

class Main extends React.Component {

  state={
    profileColor:'black',
    scanColor:'black',
    detailColor:'black',
  }

  render(){
    return (
        <Tab.Navigator 
        initialRouteName="Scan"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name == "UserInfo")
              return <Icon name='person' color={color} size={size*1.5}/>;
            if (route.name == "Scan")
              return <View style={{bottom: 0, position: 'absolute'}}>
                <Icon name='camera' reverse color={color} size={size*1.2} solid={true} />
              </View> 
            if (route.name == "detail")
              return <Icon name='list' color={color} size={size*1.5}/>;
            return null
          },
        })}
        tabBarOptions={{
          activeTintColor: BASIC_COLOR,
          showLabel: false,
          style: {
            
          }
        }}>
            <Tab.Screen 
              name="UserInfo" 
              component={UserInfo} 
            />                        
            <Tab.Screen 
              name="Scan" 
              component={ScanPage} 
            />
            <Tab.Screen
              name="detail" 
              component={DetailInfo} 
            />
        </Tab.Navigator>
  );
  }
};

const styles = StyleSheet.create({
  menu :{
    width: "100%"
  },
  container:{
    height: "100%", 
    backgroundColor: "#dddddd",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    textAlign: "center",
     fontSize: 50,
     color: "#03b6fc"
  },
  input: {
    backgroundColor: "#ffffff",
    width: 300
  },

});

export default Main;
