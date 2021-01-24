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
  View
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Menu from './components/flatlist';
import Login  from './page/login'
import ResetPWD from './page/resetpwd'
import Signup from './page/signup'
import NotificationPage from './page/notification';
import ScanPage from './page/ScanPage'
import Welcome from './page/welcome'
import Profile from "./page/profile";
import DetailInfo from './page/detailProduct';
import Icon from 'react-native-elements';
import StackNav from './page/stackNavigator';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreen: ()=> React$Node = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Button title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', { name: 'Jane' })
      }
      />
      <Button title="Login page"
      onPress={() =>
        navigation.navigate('Login')
      }
      />
      <Button title="reset password" 
      onPress={() =>
        navigation.navigate('reset password')
      }
      />
      <Button title="Sign up" 
      onPress={() =>
        navigation.navigate('sign up')
      }
      />
      <Button title="Notification" 
      onPress={() =>
        navigation.navigate('notification')
      }
      />

      <Button title="Scan" 
      onPress={() =>
        navigation.navigate('scan')
      }
      />
      <Button title="Welcome" 
      onPress={() =>
        navigation.navigate('welcome')
      }
      />
      <Button title="Detail Info" 
      onPress={() =>
        navigation.navigate('detail')
      }
      />
    </SafeAreaView>
    
    
  );
};

const ProfileScreen = ({ navigation, route }) => {
  return  <Menu></Menu>
};

const App: () => React$Node = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{
        labelStyle: {
          fontSize: 15
        }        
      }}>
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="Scan" component={ScanPage} />
          <Tab.Screen name="Detail" component={DetailInfo} />
      </Tab.Navigator>
    </NavigationContainer>
    
  );
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
  image:{

  }

});

export default App;
