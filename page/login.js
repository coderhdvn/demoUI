import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import {setData} from '../storage/AsyncStorage';
import {TOKEN_KEY} from '../constants/Constant';
import API from '../api/API';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { BASIC_COLOR } from '../constants/Constant';
import { showMessage } from 'react-native-flash-message';

export default class Login extends React.Component {
  state = {
    name:"",
    password:"",
    disable:true,
    display: false
  }

  onSubmit = async () => {
    const input = {
      username: this.state.name,
      password: this.state.password
    }
    try {
      const token = await (await API.post('/authenticate', input)).data.token;
      setData(TOKEN_KEY, token);
      this.props.navigation.navigate('Main');

      showMessage({
        message: "Đăng nhập thành công !",
        type: "success",
        description: `Tài khoản: ${input.username}`,
        duration: 3000,
        floating: true,
        icon: {
          icon: "success", position: "right"
        },
      })
    } catch (err) {
        showMessage({
          message: "Đăng nhập không thành công !",
          type: "danger",
          description: "Tên đăng nhập hoặc mật khẩu không đúng",
          duration: 3000,
          floating: true,
          icon: {
            icon: "danger", position: "right"
          },
        })
    }
    // this.props.navigation.navigate('Chat', {data: {
    //   senderId: "9da9f85e-430f-4933-9b91-0baf13738fe5",
    //   recipientId: "fdeb74ff-fc7d-4862-bd9c-e11eab3b43eb",
    //   senderName: 'anhtu',
    //   recipientName: 'admin',
    //   recipientAvatar: "https://lh3.googleusercontent.com/a-/AOh14GgEAEEDHP5exiCuaAN6hHu0NQo1_hJPrklmisW4Yw=s96-c?fbclid=IwAR0FSGYhGggk7l9CeNGMMz8mtASt5e9KqmZy0XAoAzabYh1f8gf4cGjNw6g"
    // }});
  }

  UNSAFE_componentWillReceiveProps = () => {
    if (this.props.route.params.name) {
      this.setState({ name: this.props.route.params.name })
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../images/bg_9.jpg')} style={styles.backgroundImage} >
          <View style={styles.contentView}>
          <Input
            placeholder='Tên đăng nhập'
            leftIcon={
              <Icon
                name='user'
                size={24}
                color={BASIC_COLOR}
              />
            }
            onChangeText={value => {
              this.setState({name: value})
            }}
            autoCapitalize="none"
            inputStyle={{color: BASIC_COLOR}}
            value={this.state.name}
          />  

          <Input
            placeholder='Mật khẩu'
            leftIcon={
              <Icon
                name='key'
                size={24}
                color={BASIC_COLOR}
              />
            }
            secureTextEntry={true}
            onChangeText={value => {
              this.setState({password: value})
            }}
            autoCapitalize="none"
            inputStyle={{color: BASIC_COLOR}}
            value={this.state.password}
          />  
        </View>
        <View style={styles.buttonView}>
        <Button
            icon={
              <Icon
                name="sign-in"
                size={30}
                color="white"
              />
            }
            title='Đăng nhập'
            type='outline'
            titleStyle={{color: 'white', fontSize: 20, padding: 30}}
            buttonStyle={{borderRadius: 50, borderColor: 'white', borderWidth: 1}}
            onPress={this.onSubmit}
            containerStyle={{padding: 5}}
        />
      
        <Button
            icon={
              <Icon
                name="google"
                size={30}
                color="darkred"
              />
            }
            title='Đăng nhập với Google'
            titleStyle={{color: 'darkred', fontSize: 15, padding: 10, fontWeight: "500"}}
            buttonStyle={{borderRadius: 50, borderColor: 'white', borderWidth: 1, backgroundColor: 'none'}}
            onPress={() => this.props.navigation.navigate("LoginWithGoogle")}
            containerStyle={{padding: 5}}
        />
        <Text style={{color: 'white', alignSelf: 'center'}}>----- OR -----</Text>
        <Button
            icon={
              <Icon
                name="user-plus"
                size={25}
                color="white"
              />
            }
            title='Đăng ký'
            type='outline'
            titleStyle={{color: 'white', fontSize: 20, padding: 30}}
            buttonStyle={{borderRadius: 50, borderColor: 'white', borderWidth: 1}}
            onPress={() => this.props.navigation.navigate("Sign Up")}
            containerStyle={{padding: 5}}
        />
        </View>
        <TouchableOpacity onPress={() => {
          this.props.navigation.navigate("Reset Password")
          }}>
          <Text style={{color: 'white', borderBottomWidth: 1, borderColor: 'white'}}>Quên mật khẩu?</Text>
        </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage:{
    width: "100%",
    height: "100%",
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  contentView: {
    marginTop: '25%',
    paddingTop: '5%',
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 10
  },
  logo:{
    resizeMode: "contain",
    width: "45%",
    height: "30%",
    borderRadius: 100
  },
  buttonView: {
    width: '80%',
  }
  
});
