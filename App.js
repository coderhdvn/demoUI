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

import Menu from './components/flatlist';
import Login  from './page/login'
import ResetPWD from './page/resetpwd'
import Signup from './page/signup'
import NotificationPage from './page/notification';
import ScanPage from './page/ScanPage'
import Welcome from './page/welcome'
import Profile from "./page/profile";
import DetailInfo from './page/detailProduct';
import {Icon} from 'react-native-elements';
import { color } from 'react-native-reanimated';

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

class App extends  React.Component {

  state={
    profileColor:'black',
    scanColor:'black',
    detailColor:'black',
  }

  render(){
    return (
      <NavigationContainer>
        {/* <Stack.Navigator  screenOptions={{headerShown: false}} mode="modal">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Welcome' }} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="reset password" component={ResetPWD} />
          <Stack.Screen name="notification" component={NotificationPage} />
          <Stack.Screen name="scan" component={ScanPage} />
          <Stack.Screen name="detail" component={DetailInfo} />

        </Stack.Navigator> */}

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
            <Tab.Screen name="Profile" component={ProfileScreen} options={{title: ''}}/>
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
  image:{

  }

});

export default App;
