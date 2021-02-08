import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

export default class Signup extends React.Component {
  state={
    email:"",
    password:"",
    username:"",
    display: false,
    click: false
  }
  render(){
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../images/6654319_preview.png')} />  
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Tên hiển thị..." 
            placeholderTextColor="#C9D9DA"
            onChangeText={text => {
              if(text.length != 0) {
              this.setState({username:text})
            } else {
              this.setState({click:false})
            }   
          }}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#C9D9DA"
            onChangeText={text => {
              if(text.length != 0) {
              this.setState({email:text})
            } else {
              this.setState({click:false})
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
              if(text.length != 0) {
              this.setState({password:text})
            } else {
              this.setState({click:false})
            }
          }}/>
        </View>
        <View style={styles.inputView} hide={false} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Nhập lại mật khẩu..." 
            placeholderTextColor="#C9D9DA"
            onChangeText={text => {
              if(text != this.state.password && text.length >= this.state.password.length) {
                this.setState({display: true});
                this.setState({click: false});
                console.log("TEXT", text, this.state.display)

              } else if(text == this.state.password && this.state.username.length != 0 && this.state.password.length != 0) {
                this.setState({display: false});
                this.setState({click: true});
              } 
            }}/>
        </View>
        <Text style={this.state.display ? styles.warning : styles.hide}>Mật khẩu không khớp !!!</Text>
        <TouchableOpacity style={this.state.click ? styles.signupBtn : styles.hide} onPress={()=>{
             console.log("USERNAME", this.state.username)
             console.log("EMAIL", this.state.email)
             console.log("PASSWORD", this.state.password)
             // Call API here: /api/v1/user/signup (POST)
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
    width: "30%",
    height: "20%"
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
  signupBtn:{
    width:"50%",
    borderWidth: 2,
    borderColor: "#1CBCC7",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    margin:25,
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