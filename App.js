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
  SafeAreaView
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './components/flatlist';
import Login  from './page/login'
import ResetPWD from './page/resetpwd'
import Signup from './page/signup'
import NotificationPage from './page/notification';
import ScanPage from './page/ScanPage'
import { View } from 'native-base';
import Welcome from './page/welcome'

const Stack = createStackNavigator();

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
    </SafeAreaView>
    
    
  );
};

const ProfileScreen = ({ navigation, route }) => {
  return  <Menu></Menu>
};

const App: () => React$Node = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="reset password" component={ResetPWD} />
        <Stack.Screen name="sign up" component={Signup} />
        <Stack.Screen name="notification" component={NotificationPage} />
        <Stack.Screen name="scan" component={ScanPage} />
        <Stack.Screen name="welcome" component={Welcome} />
      </Stack.Navigator>
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
