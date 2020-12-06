/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  StatusBar,
  TextInput,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image style={{height: 100, width: 100}} source={require("./logo.png")}/>
        <Text style={styles.title}>ĐĂNG NHẬP</Text>
        <View>
          <Text>Username</Text>
          <TextInput style={styles.input}></TextInput>
        </View>
        <View>
          <Text>Password</Text>
          <TextInput style={styles.input}></TextInput>
        </View>
        <Button title="OK"></Button>
      </View>
    </SafeAreaView>
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
