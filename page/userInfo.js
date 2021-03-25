import React, { useReducer, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-ionicons';
import * as ImagePicker from 'react-native-image-picker';
import { Component } from 'react';
import { ActionSheet, Root } from 'native-base'

class UserInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      resourcePath: {},
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Microsoft_Account.svg/1024px-Microsoft_Account.svg.png'
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

          <View style={styles.inputView} >
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
          </View>
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
  logo:{
    resizeMode: "contain",
    height: "30%",
    width: "30%",
    position: "absolute",
    marginTop: "3%"
  },
  addLogo:{
    resizeMode: "contain",
    transform: [
      {scale: 2}
      ],
    position: "absolute",
    marginTop: "30%"
  },
  shadow: {
    width: 1000,
    height: 1000,
    backgroundColor: "#6FF6FF",
    borderRadius: 500,
    marginTop: -800,
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
    color:"black",
    alignItems: "flex-start",
    justifyContent: 'center',
    paddingBottom: 5,
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
  },
  title: {
    fontSize: 12,
    color: 'grey'
  },
  avatar: {
    position: 'absolute',
    top: 20
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 100
  }
});

export default UserInfo;