import { NavigationHelpersContext } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

export default class Login extends React.Component {
  state = {
    email:"",
    password:"",
    disable:true
  }

  render(){
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../images/fingerprint-accepted.png')} />  
        <View style={styles.inputView} >
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
            this.props.navigation.navigate("ScanPage")
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
  }
});
