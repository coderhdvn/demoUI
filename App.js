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
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const HomeScreen: ()=> React$Node = ({ navigation }) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', { name: 'Jane' })
      }
    />
  );
};

const ProfileScreen = ({ navigation, route }) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};

const App: () => React$Node = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};

const styles = StyleSheet.create({
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
