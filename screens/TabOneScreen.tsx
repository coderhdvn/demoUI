import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { RootStackParamList } from '../types';

export default function TabOneScreen({navigation}: {navigation: StackNavigationProp<RootStackParamList, "Root">}){
  return (
    <View style={styles.container}>
      <View style={{ height: "60%", alignItems:"center" }}>
        <Image style={styles.image} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" }}></Image>
        <Text style={styles.title}>Login</Text>
      </View>
      <TextInput style={styles.input}></TextInput>
      <TextInput style={styles.input}></TextInput>
      <Button title={'Login'} onPress={() => { navigation.navigate("ScreenTwo") }}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',

  },
  input:{
    height:50,
    width: 200,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,  
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  image:{
    width: 100,
    height: 100
  }
});
