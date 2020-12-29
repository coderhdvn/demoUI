import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native';

export default class Welcome extends React.Component {
  render(){
    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={require('../images/logo1.png')} />  
        
        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#56EBFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    resizeMode: "contain",
    width: "40%",
    height: "30%"
  },
  inputView:{
    width:"80%",
    backgroundColor:"#fff",
    borderWidth: 1,
    borderRadius:15,
    height:50,
    marginBottom:5,
    marginTop: 18,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"black"
  },
  forgot:{
    color:"#1CBCC7",
    fontSize:13,
    margin: 5
  },
  loginBtn:{
    width:"50%",
    backgroundColor:"#1CBCC7",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  signupBtn:{
    width:"50%",
    borderWidth: 2,
    borderColor: "#1CBCC7",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    marginBottom:10
  },
  loginText:{
    color:"white",
    fontSize: 16
  },
  signupText:{
    color:"#1CBCC7",
    fontSize: 16
  },
  warning: {
    color: "#F17575",
    fontStyle: "italic",
    textAlign: "left",
    justifyContent: "flex-start",
    fontSize: 12
  }
});
