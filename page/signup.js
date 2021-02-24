import React, { useReducer, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Confirm from '../components/confirm'

const USERNAME_LENGTH = 3;
const USERNAME_ERROR = "Tên hiển thị phải từ 3 ký tự trở lên";
const PASSWORD_LENGTH = 6;
const PASSWORD_ERROR = "Mật khẩu phải từ 6 ký tự trở lên";
const EMAIL_ERROR = "Email không hợp lệ";
const PASSWORD_CONFIRM_ERROR = "Mật khẩu không trùng khớp"

const validate_username = (username) => {
  return username.length >= USERNAME_LENGTH ? true : false;
} 

const validate_email = (email) => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(email);
}

const validate_password = (password) => {
  return password.length >= PASSWORD_LENGTH ? true : false;
} 

const validate_confirm_password = (password, confirm_password) => {
  return password === confirm_password;
} 

const input = (state, action) => {
  switch (action.change) {
    case 'username':
      return validate_username(action.text) ?
              { ...state, username: action.text, error_username: ""}
              : { ...state, username: null, error_username: USERNAME_ERROR}
    case 'email':
      return validate_email(action.text) ?
              { ...state, email: action.text, error_email: ""}
              : { ...state, email: null, error_email: EMAIL_ERROR}
    case 'password':
      return validate_password(action.text) ?
              { ...state, password: action.text, error_password: ""}
              : { ...state, password: null, error_password: PASSWORD_ERROR}
    case 'confirm_password':
      return validate_confirm_password(state.password, action.text) ?
              { ...state, error_confirm_password: ""}
              : { ...state, error_confirm_password: PASSWORD_CONFIRM_ERROR}
    default:
      return state
  }
}

const SignUp = ({navigation}) => {
  const [inputs, dispatch] = useReducer(input, {username: "", email: "", password: "",
                                                 error_username: null, error_email: null, error_password: null, error_confirm_password: null});
  
  const [message, setMessage] = useState("");
  
  const confirm = () => {
    let check = (inputs.error_username === "") && (inputs.error_email === "") && (inputs.error_password === "") && (inputs.error_confirm_password === "");
    if (check) {
      setMessage(`Sign up with: \n Username: ${inputs.username} \n Email: ${inputs.email}`);
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
      <View style={styles.shadow}></View>
      <Image style={styles.logo} source={require('../images/6654319_preview.png')} />  
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
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
      <Text style={styles.errorText}>{inputs.error_username}</Text>
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
      <Text style={styles.errorText}>{inputs.error_email}</Text>
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
      <Text style={styles.errorText}>{inputs.error_password}</Text>
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
      <Text style={styles.errorText}>{inputs.error_confirm_password}</Text>

      <Confirm 
        message = {message}
        button = "Đăng ký"
        popup = {() => {
          confirm();
        }}
        submit = {submit}
      />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo:{
    resizeMode: "contain",
    height: "20%",
    width: "20%",
    position: "absolute",
    marginTop: 20
  },
  shadow: {
    width: 500,
    height: 500,
    backgroundColor: "#6FF6FF",
    borderRadius: 250,
    transform: [
      {scaleX: 2}
      ],
    marginTop: -320,
  },

  inputView:{
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
    color:"black",
    alignItems: 'center'
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
  errorText: {
    color: 'red',
    fontSize: 10,
    marginBottom: -5,
    textAlign: 'center'
  },
  scroll: {
    width: "80%",
    marginBottom: 20,
    marginTop: 20
  }
});

export default SignUp;