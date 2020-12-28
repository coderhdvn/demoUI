import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image,  Alert, Modal, TouchableHighlight} from 'react-native';

export default class ResetPWD extends React.Component {
  state={
    email:"",
  }
  render(){
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../images/img_398183.png')} />  
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email đã đăng ký..." 
            placeholderTextColor="#C9D9DA"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <Text style={styles.warning}>Email không hợp lệ !!!</Text>
        <TouchableOpacity style={styles.signupBtn}>
          <Text style={styles.signupText}>Lấy lại mật khẩu</Text>
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
  },
  logo:{
    resizeMode: "contain",
    width: "30%",
    height: "35%",
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
    margin:40,
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