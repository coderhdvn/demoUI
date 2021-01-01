import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";

import React from 'react';

const Item: () => React$Node = ()=>{
    return (
        <TouchableOpacity onPress={()=>{}} style={styles.item}> 
            <Image style={{width:50, height:50, marginRight: 20, opacity:0.3}} source={require('../images/img_398183.png')} />
            <View style={{width:"60%"}}>
                <Text style={{ color:"#0aa5ff", fontWeight:"bold"}}>Item Title</Text>
                <Text style={{ color:"#DDD", fontWeight:"bold"}}>01/01/2020</Text>
                <Text style={{ color:"#DDD", fontWeight:"bold"}}>GS25 Lý Thường kiệt, Tân Bình, HCM</Text>
            </View>
            <View>
                <TouchableOpacity style={{width: 50, height: 50, backgroundColor:"#0aa5ff", borderRadius:25}}></TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default class NotificationPage extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ color:"#FFF", fontSize:25, width: "100%", textAlign: "center", fontWeight: "300"}}>LỊCH SỬ</Text>
                </View>
                <View style={{backgroundColor:"#edf1f2"}}>
                   <Item/>
                   <Item/>
                   <Item/>
                   <Item/>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {flex:1},
    header: {  height: '10%', width: '100%', justifyContent:"center",backgroundColor:"#0aa5ff" },
    item: { height:100, padding:20, flexDirection: "row", marginTop:10,
      borderLeftColor:"#0aa5ff", borderLeftWidth:10 , backgroundColor:"#FFF" , padding: 12}
})
