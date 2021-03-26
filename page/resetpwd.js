import React from 'react';
import {setData} from '../storage/AsyncStorage';
import {CODE_KEY} from '../constants/Constant';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image,  Alert, Modal, TouchableHighlight} from 'react-native';
export default class ResetPWD extends React.Component {
  state={
    password: "",
    email: "",
    show: false,
    verify: false,
    bg: true,
    display: false,
    click: false
  }
  render(){
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../images/img_398183.png')} />  
        <View 
        style={styles.inputView} 
        visible={this.state.bg} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email đã đăng ký..." 
            placeholderTextColor="#C9D9DA"
            onChangeText={text => this.setState({email:text})}/>
        </View>

        <Modal
        transparent={true}
        visible={this.state.show}>
          <View style={styles.popup}>
            <Text style={styles.titlePopUp}>Nhập mã xác nhận</Text>
            <TextInput 
              style={styles.inputPopUp}
              editable
              onChangeText={text => {
                if (text.length==6) {
                  this.setState({verify: true})
                  this.setState({show: false})
                }
              }}
              maxLength={6}
              keyboardType = 'numeric'
              placeholderTextColor = "#DCD4D4"
              placeholder="000000"></TextInput>
          </View>
        </Modal>

        <Modal
        transparent={true}
        visible={this.state.verify}>
          <View style={styles.popup}>
          <Image style={styles.logo} source={require('../images/img_398183.png')} />  

            <View style={styles.inputView} >
              <TextInput
                secureTextEntry  
                style={styles.inputText}
                placeholder="Mật khẩu mới..." 
                placeholderTextColor="#C9D9DA"
                onChangeText={text => this.setState({password:text})}/>
            </View>

            <View style={styles.inputView} >
              <TextInput  
                secureTextEntry
                style={styles.inputText}
                placeholder="Nhập lại mật khẩu..." 
                placeholderTextColor="#C9D9DA"
                onChangeText={text => {
                  if(text != this.state.password && text.length >= this.state.password.length) {
                    this.setState({display: true});
                    this.setState({click: false});
                    console.log("TEXT", text, this.state.display)
    
                  } else if(text == this.state.password && this.state.password.length != 0) {
                    this.setState({display: false});
                    this.setState({click: true});
                  } 
                }}/>
            </View>
            <Text style={this.state.display ? styles.warning : styles.hide}>Mật khẩu mới không khớp !!!</Text>

            <TouchableOpacity style={this.state.click ? styles.signupBtn : styles.disable} onPress={()=>{
              console.log("EMAIL", this.state.email)
              console.log("PASSWORD", this.state.password)
              this.props.navigation.navigate("Main")
              // Call API here: /api/v1/user/login (POST)
              // fetch('http://facebook.github.io/react-native/movies.json', {
              //   method: 'POST',
              //   headers: {
              //     Accept: 'application/json',
              //     'Content-Type': 'application/json'
              //   },
              //   body: JSON.stringify({
              //     email: this.state.email,
              //     password: this.state.password 
              //   })
              //   }).then(res => {
              //     if(res && res.status == 200) {
              //       this.props.navigation.navigate("Main")
              //     }
              //     else {
              //       this.setState({fail: true})
              //     }
              //   });
              }}>
              <Text color="black">Đăng nhập</Text>
            </TouchableOpacity>
        </View>
        </Modal>

        <TouchableOpacity style={styles.signupBtn} onPress={() => {
          this.setState({show: true})
          this.setState({bg: false})
          // Call API here: /api/v1/user/email (POST)
          //this.props.navigation.navigate("ScanPage")
          // fetch('http://facebook.github.io/react-native/movies.json', {
          //       method: 'POST',
          //       headers: {
          //         Accept: 'application/json',
          //         'Content-Type': 'application/json'
          //       },
          //       body: JSON.stringify({
          //         email: this.state.email,
          //         password: this.state.password 
          //       })
          //       }).then(res => {
          //         if(res && res.status == 200) {
          //           setData(CODE_KEY, res.json())
          //         }
          //         else {
          //           this.setState({fail: true})
          //         }
          //       });
          }}>
          <Text style={styles.signupText}>Lấy lại mật khẩu</Text>
        </TouchableOpacity>
        
      </View>
    );
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
    width: "30%",
    height: "35%",
  },
  inputView:{
    width:"80%",
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
    color:"black"
  },
  forgot:{
    color:"#1CBCC7",
    fontSize:13,
    margin: 5
  },
  signupBtn:{
    width:"50%",
    borderWidth: 2,
    borderColor: "#1CBCC7",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    margin:40,
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
    color:"#1CBCC7",
    fontSize: 16
  },
  warning: {
    color: "#F17575",
    fontStyle: "italic",
    textAlign: "left",
    justifyContent: "flex-start",
    fontSize: 12
  },
  popup: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputPopUp: {
    fontSize: 30
  },
  titlePopUp: {
    fontSize: 20,
  },
  hide: {
    display: 'none'
  }
});