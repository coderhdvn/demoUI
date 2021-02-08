import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './page/login';
import Main from './page/main';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const setToken = async (value) => {
  try {
    await AsyncStorage.setItem('token', value);
  } catch (e) {
    // saving error
  }
};

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    console.log("GET DATA", value);
    if (value == null) {
      return "";
    }
    return value;
  } catch (e) {
    return null;
  }
};

class App extends React.Component {

  render() {
    // check contain token
    // if not or expired token => redirect Login Screen
    // else go to Main Screen
    var token = getToken();
    console.log("TOKEN\t", token);
    if (token == "") {
      console.log("LOGIN");
      return <Login></Login>;
    }
    else {
      console.log("MAIN");
      return <Main></Main>;
    }
  }
};

const styles = StyleSheet.create({
  menu: {
    width: "100%"
  },
  container: {
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
export default App;
