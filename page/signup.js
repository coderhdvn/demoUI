import React, { useReducer, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Button } from 'react-native';
import Confirm from '../components/confirm'

const validate_username = (username) => {
  return username.length > 3 ? true : false;
} 

const validate_email = (email) => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(email);
}

const validate_password = (password) => {
  return password.length > 6 ? true : false;
} 

const validate_confirm_password = (password, confirm_password) => {
  return password === confirm_password;
} 

const input = (state, action) => {
  switch (action.change) {
    case 'username':
      return validate_username(action.text) ?
              { ...state, username: action.text, error_username: ""}
              : { ...state, username: null, error_username: "Username must be more than 3 characters"}
    case 'email':
      return validate_email(action.text) ?
              { ...state, email: action.text, error_email: ""}
              : { ...state, email: null, error_email: "Email not valid"}
    case 'password':
      return validate_password(action.text) ?
              { ...state, password: action.text, error_password: ""}
              : { ...state, password: null, error_password: "Password must be more than 6 characters"}
    case 'confirm_password':
      return validate_confirm_password(state.password, action.text) ?
              { ...state, error_confirm_password: ""}
              : { ...state, error_confirm_password: "Password don't match"}
    default:
      return state
  }
}

const SignUp = ({navigation}) => {
  const [inputs, dispatch] = useReducer(input, {username: "", email: "", password: "",
                                                 error_username: null, error_email: null, error_password: null, error_confirm_password: null});
  
  const [message, setMessage] = useState("");
  
  const confirm = () => {
    let check = (inputs.error_username === inputs.error_email) && (inputs.error_password === inputs.error_confirm_password);
    if (check) {
      setMessage("Want to sign up?");
    } else {
      setMessage("Something wrong!");
    }
  }

  const submit = () => {
    console.log('ok');
    navigation.navigate("Login");
    // Call API
  }
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../images/6654319_preview.png')} />  
      <View style={styles.inputView} >
        <TextInput  
          style={styles.inputText}
          placeholder="Tên hiển thị..." 
          placeholderTextColor="#C9D9DA"
          onChangeText={(text) => {
            dispatch({change: 'username', text: text})
          }}
        />
      </View>
      <Text style={styles.errorInput}>{inputs.error_username}</Text>
      <View style={styles.inputView} >
        <TextInput  
          style={styles.inputText}
          placeholder="Email..." 
          placeholderTextColor="#C9D9DA"
          onChangeText={(text) => {
            dispatch({change: 'email', text: text})
          }}
          />
      </View>
      <Text style={styles.errorInput}>{inputs.error_email}</Text>
      <View style={styles.inputView} >
        <TextInput  
          secureTextEntry
          style={styles.inputText}
          placeholder="Mật khẩu..." 
          placeholderTextColor="#C9D9DA"
          onChangeText={(text) => {
            dispatch({change: 'password', text: text})
          }}
          />
      </View>
      <Text style={styles.errorInput}>{inputs.error_password}</Text>
      <View style={styles.inputView} hide={false} >
        <TextInput  
          secureTextEntry
          style={styles.inputText}
          placeholder="Nhập lại mật khẩu..." 
          placeholderTextColor="#C9D9DA"
          onChangeText={(text) => {
            dispatch({change: 'confirm_password', text: text})
          }}
          />
      </View>
      <Text style={styles.errorInput}>{inputs.error_confirm_password}</Text>

      <Confirm 
        message = {message}
        popup = {() => {
          confirm();
        }}
        submit = {submit}
      />
    </View>
  )
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
    backgroundColor:"#1CBCC7",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    marginBottom:10
  },
  disable:{
    width:"50%",
    borderRadius:25,
    backgroundColor:"#8E908A",
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
    color:"white",
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
  },
  errorInput: {
    color: 'red',
    fontSize: 10,
    marginBottom: -5
  }
});

export default SignUp;