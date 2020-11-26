import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, TextInput } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{backgroundColor:'#80829e', width:'100%', height: '40px'}}>
        <Image style={{ width: '40px', height: '40px' }} source={require('./image/react-native-logo.79778b9e.png')} />
      </View>
      <Text style={styles.text}>Login</Text>
      <StatusBar style="auto" />
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.text}>Username</Text>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '50%' }} onChangeText={text => { }} />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.text}>Password</Text>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '50%' }} onChangeText={text => { }} />
      </View>
      <Button title="Login" onPress={() => Alert.alert('Simple Button pressed')} />
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
    color: '#fff' ,
    width: 100
  },
});
