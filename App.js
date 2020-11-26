//This is an example code for Navigator// 
import React, { Component } from 'react';
//import react in our code. 

//Import react-navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

import Login from './Page/Login';
import Wellcome from './Page/Wellcome';
//import all the screens we are going to switch 
const App = createStackNavigator({
  //Constant which holds all the screens like index of any book 
    Login: { screen: Login }, 
    //First entry by default be our first screen if we do not define initialRouteName
    Wellcome: { screen: Wellcome }, 
  },
  {
    initialRouteName: 'Login',
  }
);
export default createAppContainer(App);