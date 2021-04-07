import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';
import { Component } from 'react';
import { ActionSheet, Root } from 'native-base';
import API from '../api/API';
import {getData} from '../storage/AsyncStorage';
import {TOKEN_KEY} from '../constants/Constant';
import { showMessage } from "react-native-flash-message";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { BASIC_COLOR } from '../constants/Constant';

class UserInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      resourcePath: {},
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Microsoft_Account.svg/1024px-Microsoft_Account.svg.png',
      info: {
        username: 'anhtu',
        email: 'nguyenanhtu@gmail.com',
        address: 'Moscow',
        phone: '123456789'
      },
      disabledChange: true,
      displayButton: {
        title: "Thay đổi thông tin",
        icon: "edit"
      }
    }
  }

  launchCamera = () => {
    let options = {
      storeageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        this.setState({image: response.uri})
        console.log('response', JSON.stringify(response));
      }
    });
  }

  getHeader = async() => {
      
    const token = "Bearer " + await getData(TOKEN_KEY);

    const headers = {
      'Authorization': token
    }
    
    return headers
  }

  setUser = async () => {
    let headers = await this.getHeader();

    try {
      const response = await API.get()
    } catch (err) {
      console.error(err);
    }
  }
  componentDidMount = () => {

  }

  openLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        console.log('response', JSON.stringify(response));
        this.setState({
          image: response.uri
        });
      }
    });
  }

  changeAvatar = () => {
    const BUTTONS = ['Take photo', 'Choose photo from library', 'Cancel'];
    ActionSheet.show(
      {options: BUTTONS, cancelButtonIndex: 2, title: 'Select a Photo'},
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            this.launchCamera();
            break;
          case 1: 
            this.openLibrary();
            break;
          default:
            break;
        }
      }    
    )
  }

  toggleButton = () => {
    if (this.state.disabledChange) {
      this.setState({
        disabledChange: false,
        displayButton: {
          title: "Lưu thay đổi",
          icon: "save"
        }
      })
    } else {

      console.log(this.state.info)
      this.setState({
        disabledChange: true,
        displayButton: {
          title: "Thay đổi thông tin",
          icon: "edit"
        }
      })
    }
  }

  render() {
    return (
      <Root>
        <View style={styles.container}>
          <View style={styles.shadow}></View>
          {/* <Icon name="contact" style={styles.addLogo}  size={50} onPress={() => this.getImageFromGallery()}></Icon> */}
          <TouchableOpacity 
            onPress={() => {this.changeAvatar()}}
            style={styles.avatar}
          >
            <Image 
              source = {{uri: this.state.image}}
              style = {styles.image}
            />
          </TouchableOpacity>
          
          <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
            <Input
              label="Tên đăng nhập"
              placeholder='Tên đăng nhập'
              leftIcon={
                <Icon
                  name='user'
                  size={24}
                  color={BASIC_COLOR}
                />
              }
              disabled={this.state.disabledChange}
              value={this.state.info.username}
              errorStyle={{ color: 'red' }}
              errorMessage={this.state.nameError}
              onChangeText={value => {
                this.setState({info: {...this.state.info, username: value}})
              }}
              autoCapitalize="none"
            />

            <Input
              label="Email"
              placeholder='Email'
              leftIcon={
                <Icon
                  name='envelope'
                  size={24}
                  color={BASIC_COLOR}
                />
              }
              disabled={this.state.disabledChange}
              value={this.state.info.email}
              errorStyle={{ color: 'red' }}
              errorMessage={this.state.nameError}
              onChangeText={value => {
                this.setState({info: {...this.state.info, email: value}})
              }}
              autoCapitalize="none"
            />

            <Input
              label="Địa chỉ"
              placeholder='Địa chỉ'
              leftIcon={
                <Icon
                  name='map-marker'
                  size={24}
                  color={BASIC_COLOR}
                />
              }
              disabled={this.state.disabledChange}
              value={this.state.info.address}
              errorStyle={{ color: 'red' }}
              errorMessage={this.state.nameError}
              onChangeText={value => {
                this.setState({info: {...this.state.info, address: value}})
              }}
              autoCapitalize="none"
            />

            <Input
              label="Số điện thoại"
              placeholder='Số điện thoại'
              leftIcon={
                <Icon
                  name='phone'
                  size={24}
                  color={BASIC_COLOR}
                />
              }
              disabled={this.state.disabledChange}
              value={this.state.info.phone}
              errorStyle={{ color: 'red' }}
              errorMessage={this.state.nameError}
              onChangeText={value => {
                this.setState({info: {...this.state.info, phone: value}})
              }}
              autoCapitalize="none"
            />

          {/* <View style={styles.inputView} >
              <View  
              style={styles.inputText}>
                  <Text style={styles.title} >Tên hiển thị:</Text> 
                  <Text>Nhật Lâm</Text>   
    
              </View>
          </View>
          <View style={styles.inputView} >
              <View  
              style={styles.inputText}>
                  <Text style={styles.title} > Email:</Text>  
                  <Text>nhatlam@gmail.com</Text>  
              </View>
          </View><View style={styles.inputView} >
              <View  
              style={styles.inputText}>
                  <Text style={styles.title} >Địa chỉ: </Text>    
                  <Text>9/1 Trần Trọng Cung</Text>
              </View>
          </View>
          <View style={styles.inputView} >
              <View  
              style={styles.inputText}>
                  <Text style={styles.title} >Điện thoại:</Text>
                  <Text>0905984573</Text>    
              </View>
          </View>
          <View style={styles.inputView} >
              <View  
              style={styles.inputText}>
                  <Text style={styles.title} >Mã số thuế:</Text>
                  <Text>123456789</Text>    
              </View>
          </View> */}
        </ScrollView>

        <Button
            icon={
              <Icon
                name={this.state.displayButton.icon}
                size={25}
                color={BASIC_COLOR}
                style={{padding: 5}}
              />
            }
            title={this.state.displayButton.title}
            type='outline'
            titleStyle={{color: BASIC_COLOR, fontSize: 20, padding: 5}}
            buttonStyle={{borderRadius: 30, borderColor: BASIC_COLOR}}
            containerStyle={{paddingBottom: 25}}
            onPress={() => this.toggleButton()}
        />

        </View>
      </Root>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  // logo:{
  //   resizeMode: "contain",
  //   height: "30%",
  //   width: "30%",
  //   position: "absolute",
  //   marginTop: "3%"
  // },
  // addLogo:{
  //   resizeMode: "contain",
  //   transform: [
  //     {scale: 2}
  //     ],
  //   position: "absolute",
  //   marginTop: "30%"
  // },
  shadow: {
    width: 1000,
    height: 1000,
    backgroundColor: BASIC_COLOR,
    borderRadius: 500,
    marginTop: -850,
  },

  scroll: {
    width: "80%",
    marginBottom: 20,
    marginTop: 20
  },

  avatar: {
    position: 'absolute',
    top: 20
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 100
  }
});

export default UserInfo;