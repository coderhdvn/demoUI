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
import {Icon} from 'react-native-elements';
import { color } from 'react-native-reanimated';

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
      <NavigationContainer>
        <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name == "Profile")
              return <Icon name='home' color={color} size={size*1.5}/>;
            if (route.name == "Scan")
              return <Icon name='camera' reverse color={color} size={size*1.3} solid={true}/>;
            return <Icon name='list' color={color} size={size*1.5}/>;
          },
        })}
        tabBarOptions={{
          labelStyle: {
            fontSize: 15,
          }   
        }}>
            <Tab.Screen name="Profile" component={Welcome} options={{title: ''}}/>
            <Tab.Screen name="Scan" component={ScanPage} options={{title: ''}}/>
            <Tab.Screen name="Detail" component={DetailInfo} options={{title: ''}}/>
        </Tab.Navigator>
      </NavigationContainer>  
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
