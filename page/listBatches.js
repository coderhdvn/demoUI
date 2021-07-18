import { Tab } from 'native-base';
import React from 'react';
import { Button } from 'react-native';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import API from '../api/API';
import {TOKEN_KEY} from '../constants/Constant';
import {getData} from '../storage/AsyncStorage';

export default class ListBatches extends React.Component {
    
    state = {
        list: [],
        isSentBatch: false,
    }

    onPressItem = (item) => {
    }

    getHeader = async() => {
      
        const token = "Bearer " + await getData(TOKEN_KEY);
  
        const headers = {
          'Authorization': token
        }
        
        return headers
    }
  
    loadHistory = async (isSentBatch) => {
        const headers = await this.getHeader();

        let userInfo = {}
        try {
            const profile = await API.get(`/account/users/profile`, {headers})
            userInfo = profile.data
          } catch (err) {
            console.error(err.message);
            return []
          }

        if(isSentBatch) {
            try {
                const response = await API.get(`/product/batch/sender/${userInfo.company.id}`, {headers})
                this.setState({list: response.data})
              } catch (err) {
                console.error(err.message);
                return []
              }
           
        } else {
            try {
                const response = await API.get(`/product/batch/receiver/${userInfo.company.id}`, {headers})
                this.setState({list: response.data})
              } catch (err) {
                console.error(err.message);
                return []
              }
        }
        
    }

    componentDidMount = async() => {
        this.loadHistory(this.props.isSentBatch);
    }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.contentView}>
            <FlatList 
                style={styles.listView}
                data={this.state.list}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => {
                    return <TouchableOpacity onPress={() => this.onPressItem(item)}>
                        <View style={styles.list}>
                            <View style={styles.viewText}>
                                <View style={styles.content}>
                                    <Text style={{fontWeight: "bold"}}>Tên lô hàng: </Text> 
                                    <Text> {item.name}</Text>
                                </View>
                                <View style={styles.content}>
                                    <Text style={{fontWeight: "bold"}}>Số lượng hàng: </Text> 
                                    <Text>{item.amount}</Text>
                                </View>
                                <View style={styles.content}>
                                    <Text style={{fontWeight: "bold"}}>Trạng thái: </Text> 
                                    <Text>{item.status}</Text>
                                </View>
                                <View style={styles.content}>
                                    {this.props.isSentBatch? (<Text style={{fontWeight: "bold"}}>Ngày gởi: </Text> ) : (<Text style={{fontWeight: "bold"}}>Ngày nhận: </Text> )}                         
                                    <Text style={{paddingLeft: '25%'}}>{item.dateCreated.slice(0,10)} {item.dateCreated.slice(11,19)}</Text>
                                </View>
                            </View>                           
                        </View>
                    </TouchableOpacity>
                    
                }}
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#6FF6FF",
    },
    contentView: {
        backgroundColor: "#fff",
        flex: 1,
    },
    content: {
        flexDirection: "row", 
        justifyContent: "space-between",
    },
    titleView: {
        height: "10%",
        flexDirection: 'column',
        justifyContent: 'center'
    },
    circle: {
        backgroundColor: '#E6FDFF',
        height: 200,
        width: 200,
        right: -220,
        borderRadius: 100,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    shadow: {
        backgroundColor: '#B7FBFF',
        height: 300,
        width: 300,
        position: 'absolute',
        right: -15,
        borderRadius: 150
    },
    title: {
        fontSize: 25,
        color: '#22595C',
    },
    listView: {
        marginLeft: 10,
        marginRight: 10
    },
    list: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 5,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    viewText: {
        justifyContent: 'space-around'
    },
    titleList: {
        fontSize: 20
    },
    image: {
        height: 70,
        width: 70,
    }

});