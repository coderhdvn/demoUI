import { NavigationHelpersContext } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import {setData} from '../storage/AsyncStorage';
import {TOKEN_KEY} from '../constants/Constant';
import API from '../api/API';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { BASIC_COLOR } from '../constants/Constant';

export default class Login extends React.Component {
  state = {
    name:"",
    password:"",
    disable:true,
    display: false
  }

  onSubmit = async () => {
    // const input = {
    //   username: this.state.name,
    //   password: this.state.password
    // }
    // try {
    //   const token = await (await API.post('/authenticate', input)).data.token;
    //   setData(TOKEN_KEY, token);
    //   this.props.navigation.navigate('Main');
    // } catch (err) {
    //     console.error(err.message);
    // }
    this.props.navigation.navigate('detail');
  }

  render(){
    return (
      <View style={styles.container}>
        <ImageBackground source={{uri: "https://i.pinimg.com/564x/a5/9c/bf/a59cbfbbcc2c5d232acbaaf011a453a7.jpg"}} style={styles.backgroundImage} >
          <Image style={styles.logo} source={require('../images/LOGO.jpeg')} />  
          <View style={styles.contentView}>
          <Input
            placeholder='User name'
            leftIcon={
              <Icon
                name='user'
                size={24}
                color={BASIC_COLOR}
              />
            }
            // errorStyle={{ color: 'red' }}
            // errorMessage={this.state.nameError}
            onChangeText={value => {
              this.setState({name: value})
            }}
            autoCapitalize="none"
            inputStyle={{color: BASIC_COLOR}}
            // inputContainerStyle={{backgroundColor: 'white'}}
          />  

          <Input
            placeholder='Password'
            leftIcon={
              <Icon
                name='key'
                size={24}
                color={BASIC_COLOR}
              />
            }
            // errorStyle={{ color: 'red' }}
            // errorMessage={this.state.nameError}
            onChangeText={value => {
              this.setState({password: value})
            }}
            autoCapitalize="none"
            inputStyle={{color: BASIC_COLOR}}
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
            title='Sign In'
            type='outline'
            titleStyle={{color: 'white', fontSize: 20, padding: 30}}
            buttonStyle={{borderRadius: 10, borderColor: 'white', borderWidth: 1}}
            onPress={this.onSubmit}
            containerStyle={{padding: 10}}
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
            title='Sign Up'
            type='outline'
            titleStyle={{color: 'white', fontSize: 20, padding: 30}}
            buttonStyle={{borderRadius: 10, borderColor: 'white', borderWidth: 1}}
            onPress={() => this.props.navigation.navigate("Sign Up")}
            containerStyle={{padding: 10}}
        />
        </View>
        <TouchableOpacity onPress={() => console.log('Forgot password')}>
          <Text style={{color: 'white'}}>Forgot password?</Text>
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
