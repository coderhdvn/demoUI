import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image,  Alert, Modal, TouchableHighlight} from 'react-native';
import Button from '../components/button'
export default class ResetPWD extends React.Component {
  state={
    email:"",
    show: false,
    verify: false,
    bg: true,
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
        <Text style={styles.warning}>Email không hợp lệ !!!</Text>

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
                style={styles.inputText}
                placeholder="Mật khẩu mới..." 
                placeholderTextColor="#C9D9DA"
                onChangeText={text => this.setState({email:text})}/>
            </View>

            <View style={styles.inputView} >
              <TextInput  
                secureTextEntry
                style={styles.inputText}
                placeholder="Nhập lại mật khẩu..." 
                placeholderTextColor="#C9D9DA"
                onChangeText={text => this.setState({password:text})}/>
            </View>
            <Text style={styles.warning}>Mật khẩu mới không khớp !!!</Text>

            <TouchableOpacity style={styles.signupBtn}>
              <Text color="black">Đăng nhập</Text>
            </TouchableOpacity>
        </View>
        </Modal>
        <TouchableOpacity style={styles.signupBtn} onPress={() => {
          this.setState({show: true})
          this.setState({bg: false})
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
  }
});