import React from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  SectionList
} from "react-native";
import {getData} from '../storage/AsyncStorage';
import {TOKEN_KEY} from '../constants/Constant';
import API from "../api/API";

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,247,247,1.0)',
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
  
  render(){
    if (this.obj == null) return (<Text>loading</Text>)
    return(
      <View style={styles.container}>
      <Text style={{fontWeight: "bold", fontSize: 20}}>Smart contract data</Text>
      <SectionList
        sections={[
          {title: 'Block', data: [ "blockHash", "blockNumber", "from", "to"]},
          //{title: 'Event', data: [ "blockHash", "blockNumber", "from", "to"]},
        ]}
        renderItem={({item}) => <View style={styles.item}>
        <Text style={{fontWeight: "bold"}}>{item}:</Text>
        <Text>{this.obj.block[item]}</Text></View>}

        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
        keyExtractor={(item, index) => index}
      />
      <SectionList
        sections={[
          {title: 'Event', data: [ "id", "branchid",  "companyOwner" , "companyProduce", "templateid", "mfgDate", "expDate", "check"]}]}
        renderItem={({item}) => <View style={styles.item}>
        <Text style={{fontWeight: "bold"}}>{item}:</Text>
        <Text>{this.obj.event[item]==true?"true":this.obj.event[item]==false?"false":this.obj.event[item]}</Text></View>}
        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
        keyExtractor={(item, index) => index}
      />
    </View>
    
    )
  }

}
    