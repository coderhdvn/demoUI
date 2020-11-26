import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, TextInput } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#3e86fa', width: '100%', height: '40px' }}>
      </View>
      <Image style={{ width: '100px', height: '100px', paddingBottom: 20 }} source={require('./image/react-native-logo.79778b9e.png')} />
      <Text style={styles.logo}>Login</Text>
      <StatusBar style="auto" />
      {input("User Name")}
      {input("Password")}
      <Button style={{ color: "#3e86fa" }} title="Login" onPress={() => Alert.alert('Simple Button pressed')} />
    </View>   
  );
}

function input(label){
    return (
      <View style={{ flexDirection: 'row', alignItems: 'flex-end|center', width: '70%', paddingBottom: 20 }}>
        <View style={{ width: '30%' }}>
          <Text style={styles.text} >{label}</Text>
        </View>
        <TextInput style={{color: 'white', height: 40, borderColor: 'gray', borderWidth: 1, width:'70%', height: 20 }} onChangeText={text => { }} />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    backgroundColor: '#01072e',
  },
  text: {
    color: '#fff',
    fontWeight: 600
  },
  logo:{
    color: '#fff',
    fontSize: 30
  }
});
