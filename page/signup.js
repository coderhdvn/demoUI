import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import API from '../api/API';
import { ScrollView } from 'react-native-gesture-handler';
import { BASIC_COLOR } from '../constants/Constant';
import { showMessage } from 'react-native-flash-message';

const USERNAME_LENGTH = 3;
const USERNAME_ERROR = "Tên hiển thị phải từ 3 ký tự trở lên";
const PASSWORD_LENGTH = 6;
const PASSWORD_ERROR = "Mật khẩu phải từ 6 ký tự trở lên";
const CONFIRM_PASSWORD_ERROR = "Mật khẩu không trùng khớp";

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

  validate_password = (password) => {
    return password.length >= PASSWORD_LENGTH ? true : false;
  } 
  
  validate_confirm_password = (password, confirm_password) => {
    return password === confirm_password;
  } 

  check_duplicate_email = async (email) => {
    try {
      const response = await API.get(`account/users/email/${email}`);
      return response.data;
    } catch (err) {
      console.error(err.message);
    }
  }
  validate_email = (email) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email)) {
      if (this.check_duplicate_email(email)) {
        this.setState({
          email: email,
          emailError: ""
        })
      } else {
        this.setState({
          email: '',
          emailError: "Email đã được sử dụng"
        })
      }
    } else {
      this.setState({
        email: '',
        emailError: "Email không hợp lệ"
      })
    }
  }

  check_duplicate_username = async (name) => {
    try {
      const response = await API.get(`/account/users/name/${name}`);
      return response.data
    } catch (err) {
      console.error(err.message)
    }
  }

  validate_username = (username) => {
    if (username.length >= USERNAME_LENGTH) {
        if (this.check_duplicate_username(username)) {
          this.setState({
            name: username,
            nameError: ""
          })
        } else {
          this.setState({
            name: '',
            nameError: "Tên đăng nhập đã tồn tại"
          })
        }
    } else {
      this.setState({
        name: '',
        nameError: USERNAME_ERROR
      })
    }
  
  } 

  validate_before_submit = (input) => {
    return (input.name !== '' && input.password !== '' && input.email !== '' && this.state.confirmPassword !== '') ? true : false
  }  

  onSubmit = async () => {
    let input = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }
    if (this.validate_before_submit(input)) {
      try {
        const response = await API.post('/account/users', input);
        console.log(response.data);
        this.props.navigation.navigate("Login", {message: "Sign up success !", name: input.name});

        showMessage({
          message: "Đăng ký thành công !",
          type: "success",
          description: `Đăng ký thành công với tài khoản: ${input.name}`,
          duration: 4000,
          floating: true,
          icon: {
            icon: "success", position: "right"
          },
        })

      } catch (err) {
        showMessage({
          message: "Đăng ký không thành công !",
          type: 'danger',
          description: err.message,
          duration: 5000,
          floating: true,
          icon: {
            icon: 'danger', position: "right"
          },
        })
      }
    } else {
      showMessage({
        message: "Đăng ký không thành công !",
        type: 'danger',
        description: "Hãy kiểm tra lại thông tin",
        duration: 5000,
        floating: true,
        icon: {
          icon: 'danger', position: "right"
        },
      })
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
            placeholder='Tên đăng nhập'
            leftIcon={
              <Icon
                name='user'
                size={24}
                color={BASIC_COLOR}
              />
            }
            errorStyle={{ color: 'red' }}
            errorMessage={this.state.nameError}
            onChangeText={value => {
              this.validate_username(value) 
            }}
            autoCapitalize="none"
          />  
          <Input
            placeholder='Email'
            leftIcon={
              <Icon
                name='envelope'
                size={24}
                color={BASIC_COLOR}
              />
            }
            autoCapitalize="none"
            errorStyle={{ color: 'red' }}
            errorMessage={this.state.emailError}
            onChangeText={value => {
              this.validate_email(value) 
            }}
          />
          <Input
            placeholder='Mật khẩu'
            secureTextEntry={true}
            leftIcon={
              <Icon
                name='key'
                size={24}
                color={BASIC_COLOR}
              />
            }
            autoCapitalize="none"
            errorStyle={{ color: 'red' }}
            errorMessage={this.state.passwordError}
            onChangeText={value => {
              this.validate_password(value) 
                ? this.setState({ password: value, passwordError: ''}) 
                : this.setState({ password: '', passwordError: PASSWORD_ERROR})
            }}
          />
          <Input
            placeholder='Nhập lại mật khẩu'
            secureTextEntry={true}
            leftIcon={
              <Icon
                name='key'
                size={24}
                color={BASIC_COLOR}
              />
            }
            autoCapitalize="none"
            errorStyle={{ color: 'red' }}
            errorMessage={this.state.confirmPasswordError}
            onChangeText={value => {
              this.validate_confirm_password(value, this.state.password) 
                ? this.setState({ confirmPassword: value, confirmPasswordError: ''}) 
                : this.setState({ confirmPassword: '', confirmPasswordError: CONFIRM_PASSWORD_ERROR})
            }}
          />
        </ScrollView>
        <View style={{margin: 20}}>
          <Button
            icon={
              <Icon
                name="user-plus"
                size={25}
                color={BASIC_COLOR}
              />
            }
            title='Đăng ký'
            type='outline'
            titleStyle={{color: BASIC_COLOR, fontSize: 20, padding: 30}}
            buttonStyle={{borderRadius: 30, borderColor: BASIC_COLOR}}
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
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: BASIC_COLOR,
    borderRadius: 10,
    margin: 15,
    shadowColor: BASIC_COLOR,
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.2,
    elevation: 20,
  },
  contentView: {
    width: '95%',
  },
});