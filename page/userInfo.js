import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';
import { Component } from 'react';
import { ActionSheet, Root } from 'native-base';
import API from '../api/API';
import {getData, setData} from '../storage/AsyncStorage';
import {TOKEN_KEY} from '../constants/Constant';
import { showMessage } from "react-native-flash-message";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Text } from 'react-native-elements';
import { BASIC_COLOR } from '../constants/Constant';
import axios from 'axios';

class UserInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Microsoft_Account.svg/1024px-Microsoft_Account.svg.png',
      info: {},
      disabledChange: true,
      infoChange: {},
    }
  }

  setAvatar = async (image) => {
    let headers = await this.getHeader();
    try {
      let imageName = image.fileName;
      let uri = image.uri;
      
      const getUrl = await API.put(`/uploadserver/put_image/${imageName}`, null, {headers});

      await axios.create({baseURL: getUrl.data}).put("", {image: uri});

      //edit imageName in database
      this.setState({
        infoChange: { ...this.state.infoChange, image: imageName },
        image: uri
      });
      await this.saveAvatar(imageName);

    } catch (err) {
      showMessage({
        message: "Thay đổi ảnh đại diện không thành công!",
        type: 'danger',
        description: err.message,
        duration: 3000,
        floating: true,
        icon: {
          icon: 'danger', position: "right"
        },
      })
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
        this.setAvatar(response)
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
        this.setAvatar(response);
      }
    });
  }

  changeAvatar = () => {
    const BUTTONS = ['Chụp ảnh', 'Chọn ảnh từ thư viện', 'Hủy'];
    ActionSheet.show(
      {options: BUTTONS, cancelButtonIndex: 2, title: 'Chọn 1 bức ảnh'},
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

  getImage = async (imageName) => {
    let headers = await this.getHeader();
    try {
      const getUrl = await API.get(`/uploadserver/get_image/${imageName}`, {headers});

      const response = await axios.create({baseURL: getUrl.data}).get("");
      let image = response.data.image;
      this.setState({image});
    } catch (err) {
      console.log("avatar not found")
    }
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
        display_name: user.displayName,
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: user.image,
        company: user.company.name
      }
      if (user.image) {
        this.getImage(user.image)
      }
      this.setState({ info, infoChange: info });
    } catch (err) {
      console.error(err);
    }
  }

  checkEdit = () => {
    let info = this.state.info;
    let infoChange = this.state.infoChange;
    
    return (info.name !== infoChange.name 
      || info.email !== infoChange.email 
      || info.phone !== infoChange.phone 
      || info.image !== infoChange.image 
      || info.display_name !== infoChange.display_name)
  }

  saveAvatar = async (image) => {
    let headers = await this.getHeader();
    try {
      await API.put(`account/users/avatar/${image}`, null, {headers});

      showMessage({
        message: "Thay đổi avatar thành công !",
        type: "success",
        duration: 3000,
        floating: true,
        icon: {
          icon: "success", position: "right"
        },
      })
    }
    catch (err) {
      showMessage({
        message: "Thay đổi avatar không thành công !",
        type: 'danger',
        description: err.message,
        duration: 3000,
        floating: true,
        icon: {
          icon: 'danger', position: "right"
        },
      })
    }
  }

  changeInfo = async () => {
    let headers = await this.getHeader();
    if (this.checkEdit()) {
      try {
        let user = this.state.infoChange;
        let info = {
          displayName: user.display_name,
          email: user.email,
          phone: user.phone,
          company: null,
        }
  
        await API.put(`/account/users/${user.id}`, info, {headers});
  
        showMessage({
          message: "Thay đổi thông tin thành công !",
          type: "success",
          duration: 3000,
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
          duration: 3000,
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
        duration: 3000,
        floating: true,
        icon: {
          icon: 'warning', position: "right"
        },
      })
    }
  }

  changePassword = () => {

  }

  changeUsername = () => {

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
          <TouchableOpacity 
            onPress={() => {this.changeAvatar()}}
            style={styles.avatar}
          >
            <Image 
              source = {{uri: this.state.image}}
              style = {styles.image}
            />
            <Button
            icon={
              <Icon
                name='camera'
                size={20}
                color='white'
              />
            }
            type='outline'
            titleStyle={{color: 'white', fontSize: 15, padding: 5}}
            buttonStyle={{borderColor: 'rgba(255, 255, 255, 0)', borderRadius: 50}}
            containerStyle={{position: 'absolute', right: 0, bottom: 0, backgroundColor: "rgba(255, 255, 255, 0.3)"}}
            onPress={() => {this.changeAvatar()}}
          />
          </TouchableOpacity>

          <Button
            icon={
              <Icon
                name='user'
                size={20}
                color='white'
              />
            }
            title={this.state.infoChange.name}
            type='outline'
            titleStyle={{color: 'white', fontSize: 15, padding: 5}}
            buttonStyle={{borderColor: BASIC_COLOR}}
            containerStyle={{position: 'absolute', left: 0}}
            onPress={() => this.changeUsername()}
          />

          <Button
            icon={
              <Icon
                name='sign-out'
                size={20}
                color='white'
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
              placeholder='Họ và tên'
              leftIcon={
                <Icon
                  name='user'
                  size={30}
                  color={BASIC_COLOR}
                />
              }
              disabled={this.state.disabledChange}
              value={this.state.infoChange.display_name}
              errorStyle={{ color: 'red' }}
              errorMessage={this.state.nameError}
              onChangeText={value => {
                this.setState({ infoChange: {...this.state.infoChange, display_name: value }})
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

            <Input
              placeholder='Công ty'
              leftIcon={
                <Icon
                  name='building'
                  size={24}
                  color={BASIC_COLOR}
                />
              }
              disabled={this.state.disabledChange}
              value={this.state.info.company}
              errorStyle={{ color: 'red' }}
              errorMessage={this.state.nameError}
              autoCapitalize="none"
            />        

        {
          this.state.disabledChange
          ? <View style={{justifyContent: 'center', flexDirection: 'row'}}>
              <Button
                  icon={
                    <Icon
                      name="edit"
                      size={22}
                      color={BASIC_COLOR}
                      style={{padding: 5}}
                    />
                  }
                  title="Thay đổi thông tin"
                  type='outline'
                  titleStyle={{color: BASIC_COLOR, fontSize: 18, padding: 5}}
                  buttonStyle={{borderRadius: 30, borderColor: BASIC_COLOR}}
                  onPress={() => this.setState({ disabledChange: false })}
              />
            </View>
          : <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Button
                icon={
                  <Icon
                    name="times"
                    size={22}
                    color='red'
                    style={{padding: 5}}
                  />
                }
                title="Hủy"
                type='outline'
                titleStyle={{color: 'red', fontSize: 18, padding: 5}}
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
                    size={22}
                    color={BASIC_COLOR}
                    style={{padding: 5}}
                  />
                }
                title="Lưu thay đổi"
                type='outline'
                titleStyle={{color: BASIC_COLOR, fontSize: 18, padding: 5}}
                buttonStyle={{borderRadius: 30, borderColor: 'white'}}
                onPress={() => this.changeInfo()}
              />
            </View>
        }

        </ScrollView>
        
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

  shadow: {
    width: 1000,
    height: 1000,
    backgroundColor: BASIC_COLOR,
    borderRadius: 500,
    marginTop: -830,
  },

  scroll: {
    width: "90%",
    marginBottom: 20,
    marginTop: 25,
    paddingTop: 15
  },

  avatar: {
    position: 'absolute',
    top: 30,
    marginBottom: 20
  },

  image: {
    height: 130,
    width: 130,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'black'
  }
});

export default UserInfo;