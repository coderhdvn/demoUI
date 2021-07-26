import React from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  SectionList,
  Image
} from "react-native";
import {getData} from '../storage/AsyncStorage';
import {TOKEN_KEY} from '../constants/Constant';
import API from "../api/API";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    overflow: "scroll"
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: "#5294ff",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 50,
    display: "flex",
    flexDirection: "column"
  },
})

export class Block extends React.Component {

  obj = null

  componentDidMount = async ()=> {  
    try {
      const response = await API.get('product/products/'+this.props.route.params.id, 
      {headers:{
        'Authorization': "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY1NjkyMDc1MywiaWF0IjoxNjI1Mzg0NzUzfQ.LUwF2zXsb6IZdxTUHeTgjlVhh3JTKr15pBzkUowJJgLl8j0Zq75IjxW2y_e-Bm9XDaru_mRNdjrFLyCwzh1XYQ"
      }})
      this.obj = response.data;
      this.forceUpdate()
    } catch(err) {
      console.log(err)
    }
 
  }

  check(x){
    return x == true?"Sản phẩm này đã được tiêu thụ":"sản phẩm này chưa được tiêu thụ";
  }
  
  render(){
    console.log(this.obj)
    if (this.obj == null || this.obj.block == null || this.obj.event == null  ) return (<Text style={{justifyContent: "center", alignItems: "center", fontSize: 20, padding: "10%", paddingTop: "50%"}}>Sản phẩm này chưa được đồng bộ lên Blockchain !!!</Text>)
    return(
      <View style={styles.container}>
      <View style={{display: "flex", flexDirection: "row"}}>
        <Image source={require('../images/eth.png')} style={{ width: 40, height: 40 }}/>
        <Text style={{fontWeight: "bold", fontSize: 20, paddingLeft: "15%"}}>Dữ liệu trên Blockchain</Text>
      </View>
      <Text style={{fontStyle: "italic", fontSize: 14, marginBottom: 20, paddingLeft: "5%"}}>Đây là dữ liệu minh bạch và không bị sửa đổi </Text>
      <SectionList
        sections={[
          {title: 'Block', data: [ {name: "blockHash", sec: 1}, {name:"blockNumber", sec: 1}, {name:"from", sec: 1}, {name:"to", sec: 1}]},
          {title: 'Event', data: [ 
          {name:"check", sec: 2},
          {name:"id", sec: 2}, {name:"branchid", sec: 2},
           {name:"companyOwner", sec: 2}, {name:"companyProduce", sec: 2},
           {name:"templateid", sec: 2}, {name:"mfgDate", sec: 2},
           {name:"expDate", sec: 2}, 
          ]},
        ]}
        renderItem={({item}) => 
        <View style={styles.item}>
        <Text style={{fontWeight: "bold"}}>{item.name}:</Text>
        <Text style={{fontSize: 10, color: item.name=="from"?"green": "black"}}>{
        item.sec==1?this.obj.block[item.name]:item.name=="check"?this.check(this.obj.event[item.name]):this.obj.event[item.name]
        }</Text></View>}

        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
        keyExtractor={(item, index) => index}
      />
      
    </View>
    
    )
  }

}
