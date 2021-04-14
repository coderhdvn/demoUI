import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import API from '../api/API';
import { ScrollView } from 'react-native-gesture-handler';
import { BASIC_COLOR } from '../constants/Constant';
import { showMessage } from 'react-native-flash-message';

const PASSWORD_LENGTH = 6;
const PASSWORD_ERROR = "Mật khẩu phải từ 6 ký tự trở lên";
const EMAIL_ERROR = "Email không hợp lệ";
const CONFIRM_PASSWORD_ERROR = "Mật khẩu không trùng khớp"

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
export default class ResetPWD extends React.Component {
  state = {
    email:"",
    password:"",
    confirmPassword: "",
    emailError: '',
    passwordError: '',
    confirmPasswordError: ''
  }

  onSubmit = async () => {
    let input = {
      email: this.state.email,
      password: this.state.password
    }
    if (validate_before_submit(input)) {
      try {
        
        this.props.navigation.navigate("Login", {message: "Sign up success !", email: input.email});

        showMessage({
          message: "Lấy lại mật khẩu thành công!",
          type: "success",
          description: `Hãy kiểm tra tài khoản email: ${input.email} để xác nhận đổi mật khẩu`,
          duration: 5000,
          floating: true,
          icon: {
            icon: "success", position: "right"
          },
        })

      } catch (err) {
        showMessage({
          message: "Lấy lại mật khẩu không thành công !",
          type: 'danger',
          description: "Hãy kiểm tra lại kết nối mạng",
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
              validate_email(value) 
                ? this.setState({ email: value, emailError: ''}) 
                : this.setState({ email: '', emailError: EMAIL_ERROR})
            }}
          />
          <Input
            placeholder='Nhập mật khẩu mới'
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
              validate_password(value) 
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
              validate_confirm_password(value, this.state.password) 
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
            title='Lấy lại mật khẩu'
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