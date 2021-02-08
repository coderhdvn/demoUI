import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './page/login';
import Main from './page/main';
import Account from './page/account';

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
    // check token
    // if not or expired token => redirect Login Screen
    // else go to Main Screen
    var token = getToken();
    console.log("TOKEN\t", token);
    if (token == "") {
      console.log("LOGIN");
      return <Account></Account>;
    }
    else {
      console.log("MAIN");
      return <Account></Account>;
    }
  }
};

export default App;
