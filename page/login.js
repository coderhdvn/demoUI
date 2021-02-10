import { NavigationHelpersContext } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import {setData} from '../storage/AsyncStorage';
import {TOKEN_KEY} from '../constants/Constant';


export default class Login extends React.Component {
  state = {
    email:"",
    password:"",
    disable:true,
    display: false
  }

  render(){
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../images/fingerprint-accepted.png')} />  
        <View style={styles.inputView}>
          <TextInput  
            style={styles.inputText}
            placeholder="Tên đăng nhập..." 
            placeholderTextColor="#C9D9DA"
            onChangeText={text => {
              if(text.length > 0) {
                this.setState({email:text})
                if(this.state.password.length > 0) {
                  this.setState({disable:false})
                }  
              } 
            }}/>
        </View>

        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Mật khẩu..." 
            placeholderTextColor="#C9D9DA"
            onChangeText={text => {
              if(text.length > 0) {
                this.setState({password:text})
                if(this.state.email.length > 0) {
                  this.setState({disable:false})
                }   
              } 
            }}/>
        </View>

        <Text style={this.state.display ? styles.warning : styles.hide}>Tài khoản không tồn tại !!!</Text>

        <TouchableOpacity onPress={()=>{
            this.props.navigation.navigate("Reset Password")
          }}>
          <Text style={styles.forgot}>Quên mật khẩu?</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={this.state.disable} style={this.state.disable ? styles.disable : styles.loginBtn} onPress={()=>{
          console.log("EMAIL", this.state.email)
          console.log("PASSWORD", this.state.password)
          // Call API here: /api/v1/user/login (POST)
          // setToken to Local Storage
          fetch('http://facebook.github.io/react-native/movies.json', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: this.state.email,
              password: this.state.password 
            })
          }).then(res => {
            console.log("RESPONSE", res.json())
            if(res && res.status == 200) {
              setData(TOKEN_KEY, res.json())
              this.setState({display: false})
              this.props.navigation.navigate("Main")
            }
            else {
              this.setState({display: true})
            }
          });
          }}>
          <Text style={styles.loginText}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupBtn} onPress={()=>{
            this.props.navigation.navigate("Sign Up")
          }}>
          <Text style={styles.signupText}>Đăng ký</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  disable: {
    width:"50%",
    backgroundColor:"#8E908A",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
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
  },
  hide: {
    display: 'none'
  }
});
