import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';
import { Component } from 'react';
import { ActionSheet, Root } from 'native-base';
import API from '../api/API';
import {getData, setData} from '../storage/AsyncStorage';
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
      info: {},
      disabledChange: true,
      displayButton: {
        title: "Thay đổi thông tin",
        icon: "edit"
      },
      infoChange: {},
      checkEditUsername: false
    }
  }

  launchCamera = () => {
    let options = {
      storageOptions: {
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
      const response = await API.get("/account/users/profile", {headers});
      let user = response.data;
      let info = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      }
      this.setState({ info, infoChange: info });
    } catch (err) {
      console.error(err);
    }
  }

  checkEdit = () => {
    let info = this.state.info;
    let infoChange = this.state.infoChange;
    
    return (info.name !== infoChange.name || info.email !== infoChange.email || info.phone !== infoChange.phone)
  }

  changeInfo = async () => {
    let headers = await this.getHeader();
    if (this.checkEdit()) {
      try {
        let user = this.state.infoChange;
        let info = {
          name: user.name,
          email: user.email,
          phone: user.phone,
        }
  
        await API.put(`/account/users/${user.id}`, info, {headers});
  
        showMessage({
          message: "Thay đổi thông tin thành công !",
          type: "success",
          duration: 4000,
          floating: true,
          icon: {
            icon: "success", position: "right"
          },
        })
        this.setState({ 
          disabledChange: true,
          info: { ...info, id: this.state.info.id }
        });


      } catch (err) {
        showMessage({
          message: "Thay đổi thông tin không thành công !",
          type: 'danger',
          description: err.message,
          duration: 4000,
          floating: true,
          icon: {
            icon: 'danger', position: "right"
          },
        })
      }
    } else {
      showMessage({
        message: "Thay đổi thông tin không thành công !",
        type: 'warning',
        description: "Bạn chưa thay đổi thông tin nào.",
        duration: 4000,
        floating: true,
        icon: {
          icon: 'warning', position: "right"
        },
      })
    }
  }

  logout = () => {
    this.props.navigation.navigate("Login");
  }

  componentDidMount = async () => {
    await this.setUser();
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

          <Button
            icon={
              <Icon
                name='sign-out'
                size={20}
                color='white'
                // style={{padding: 1}}
              />
            }
            title="Đăng xuất"
            type='outline'
            titleStyle={{color: 'white', fontSize: 15, padding: 5}}
            buttonStyle={{borderColor: BASIC_COLOR}}
            containerStyle={{position: 'absolute', right: 0}}
            onPress={() => this.logout()}
          />
          
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
              value={this.state.infoChange.name}
              errorStyle={{ color: 'red' }}
              errorMessage={this.state.nameError}
              onChangeText={value => {
                this.setState({ infoChange: {...this.state.infoChange, name: value }})
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
              value={this.state.infoChange.email}
              errorStyle={{ color: 'red' }}
              errorMessage={this.state.nameError}
              onChangeText={value => {
                this.setState({ infoChange: {...this.state.infoChange, email: value }})
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
              value={this.state.infoChange.phone}
              errorStyle={{ color: 'red' }}
              errorMessage={this.state.nameError}
              onChangeText={value => {
                this.setState({ infoChange: {...this.state.infoChange, phone: value }})
              }}
              autoCapitalize="none"
            />
        </ScrollView>
        {
          this.state.disabledChange
          ? <View style={{flexDirection: 'row'}}>
              <Button
                  icon={
                    <Icon
                      name="edit"
                      size={25}
                      color={BASIC_COLOR}
                      style={{padding: 5}}
                    />
                  }
                  title="Thay đổi thông tin"
                  type='outline'
                  titleStyle={{color: BASIC_COLOR, fontSize: 20, padding: 5}}
                  buttonStyle={{borderRadius: 30, borderColor: BASIC_COLOR}}
                  containerStyle={{paddingBottom: 30}}
                  onPress={() => this.setState({ disabledChange: false })}
              />
            </View>
          : <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '90%', paddingBottom: 30}}>
              <Button
                icon={
                  <Icon
                    name="times"
                    size={25}
                    color='red'
                    style={{padding: 5}}
                  />
                }
                title="Hủy"
                type='outline'
                titleStyle={{color: 'red', fontSize: 20, padding: 5}}
                buttonStyle={{borderRadius: 30, borderColor: 'white'}}
                onPress={() => this.setState({
                  disabledChange: true,
                  infoChange: this.state.info
                })}
              />
              <Button
                icon={
                  <Icon
                    name="save"
                    size={25}
                    color={BASIC_COLOR}
                    style={{padding: 5}}
                  />
                }
                title="Lưu thay đổi"
                type='outline'
                titleStyle={{color: BASIC_COLOR, fontSize: 20, padding: 5}}
                buttonStyle={{borderRadius: 30, borderColor: 'white'}}
                onPress={() => this.changeInfo()}
              />
            </View>
        }
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