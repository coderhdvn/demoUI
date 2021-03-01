import React, { useReducer, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const UserInfo = () => {
  return (
    <View style={styles.container}>
        <View style={styles.shadow}></View>
        <Image style={styles.logo} source={require('../images/6654319_preview.png')} />
        <TouchableOpacity>
            <Image style={styles.addLogo} source={require('../images/plus.png')} /> 
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
  )
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
    height: "5%",
    width: "5%",
    position: "absolute",
    marginTop: "24%"
  },
  shadow: {
    width: "100%",
    height: "45%",
    backgroundColor: "#6FF6FF",
    borderRadius: 300,
    transform: [
      {scaleX:1.3}
      ],
    marginTop: -100,
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
  }
});

export default UserInfo;