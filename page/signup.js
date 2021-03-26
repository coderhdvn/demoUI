import React, { useReducer, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import API from '../api/API';
import { ScrollView } from 'react-native-gesture-handler';

const USERNAME_LENGTH = 3;
const USERNAME_ERROR = "Tên hiển thị phải từ 3 ký tự trở lên";
const PASSWORD_LENGTH = 6;
const PASSWORD_ERROR = "Mật khẩu phải từ 6 ký tự trở lên";
const EMAIL_ERROR = "Email không hợp lệ";
const CONFIRM_PASSWORD_ERROR = "Mật khẩu không trùng khớp"

const auth = {
  headers: {
    'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY0ODEzNzY5MCwiaWF0IjoxNjE2NjAxNjkwfQ.ezk9cf5ZaCMRDl_ZdLgLwd3zlTCr5_gM1t4kc4tm9BAgpF7ubmUOs3lvLs-3GiLdZR0XFNZtAq7bcgaQ_potBw'
  }
}

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

const validate_before_submit = (input) => {
  return (input.name !== '' && input.password !== '') ? true : false
}

export default class SignUp extends React.Component {
  state = {
    name:"",
    email:"",
    password:"",
    confirmPassword: "",
    nameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: ''
  }

  onSubmit = async () => {
    let input = {
      name: this.state.name,
      // email: this.state.email,
      password: this.state.password
    }
    if (validate_before_submit(input)) {
      try {
        const response = await API.post('/account/users', input, auth);
        console.log(response.data);
        this.props.navigation.navigate("Login");
      } catch (err) {
        console.error(err.message)
      }
    } else {
      console.error("Please check all your information")
    }

  }

  render(){
  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Image style={styles.logo} source={require('../images/LOGO.jpeg')} /> 
      </View>
      <View style = {styles.contentView}>
        <ScrollView>
          <Input
            placeholder='User name'
            leftIcon={
              <Icon
                name='user'
                size={24}
                color='#1CBCC7'
              />
            }
            errorStyle={{ color: 'red' }}
            errorMessage={this.state.nameError}
            onChangeText={value => {
              validate_username(value) 
                ? this.setState({ name: value, nameError: ''}) 
                : this.setState({ name: '', nameError: USERNAME_ERROR})
            }}
            autoCapitalize="none"
          />  
          <Input
            placeholder='Email'
            leftIcon={
              <Icon
                name='envelope'
                size={24}
                color='#1CBCC7'
              />
            }
            autoCapitalize="none"
            errorStyle={{ color: 'red' }}
            errorMessage={this.state.emailError}
            onChangeText={value => {
              validate_email(value) 
                ? this.setState({ email: value, emailError: ''}) 
                : this.setState({ email: '', emailError: EMAIL_ERROR})
            }}
          />
          <Input
            placeholder='Password'
            secureTextEntry={true}
            leftIcon={
              <Icon
                name='key'
                size={24}
                color='#1CBCC7'
              />
            }
            autoCapitalize="none"
            errorStyle={{ color: 'red' }}
            errorMessage={this.state.passwordError}
            onChangeText={value => {
              validate_password(value) 
                ? this.setState({ password: value, passwordError: ''}) 
                : this.setState({ password: '', passwordError: PASSWORD_ERROR})
            }}
          />
          <Input
            placeholder='Confirm password'
            secureTextEntry={true}
            leftIcon={
              <Icon
                name='key'
                size={24}
                color='#1CBCC7'
              />
            }
            autoCapitalize="none"
            errorStyle={{ color: 'red' }}
            errorMessage={this.state.confirmPasswordError}
            onChangeText={value => {
              validate_confirm_password(value) 
                ? this.setState({ confirmPassword: value, confirmPasswordError: ''}) 
                : this.setState({ confirmPassword: '', confirmPasswordError: CONFIRM_PASSWORD_ERROR})
            }}
          />
        </ScrollView>
        <View style={styles.button}>
          <Button
            icon={
              <Icon
                name="user-plus"
                size={25}
                color="#1CBCC7"
              />
            }
            title='Sign Up'
            type='outline'
            titleStyle={{color: '#1CBCC7', fontSize: 20, padding: 30}}
            buttonStyle={{borderRadius: 30, borderColor: '#1CBCC7'}}
            onPress={this.onSubmit}
          />
        </View>
      </View>
    </View>
  )
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  contentView: {
    width: '85%',
  },
  button: {
    margin: 20
  }
});