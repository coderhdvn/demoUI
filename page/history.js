import { Tab } from 'native-base';
import React from 'react';
import { Button } from 'react-native';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import API from '../api/API';
import {TOKEN_KEY} from '../constants/Constant';
import {getData} from '../storage/AsyncStorage';

export default class History extends React.Component {
    
    state = {
        list: []
    }

    onPressItem = (item) => {
        this.props.navigation.navigate("Question1", {product: item});
    }

    getHeader = async() => {
      
        const token = "Bearer " + await getData(TOKEN_KEY);
  
        const headers = {
          'Authorization': token
        }
        
        return headers
    }
  
    loadHistory = async () => {
        const headers = await this.getHeader();
        try {
            const response = await API.get(`/logger/consumes/customer`, {headers})
            let loggers = response.data 
            let products = []
            loggers.forEach(async logger => {
                const product = await API.get(`/product/products/` + logger.productId, {headers})
                let item = product.data
                item.historyId = logger.id
                item.date = logger.createdAt
                this.setState({
                    list: [...this.state.list, item]
                  })
            });
            return products
          } catch (err) {
            console.error(err.message);
            return []
          }
    }

    componentDidMount = async () => {
        await this.loadHistory();
    }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
            <View style={styles.shadow}>
            </View>
            <View style={styles.circle}>
                <Text style={styles.title}>   Lịch sử</Text>
            </View>
            
        </View>
        
        <View style={styles.contentView}>
            <FlatList 
                style={styles.listView}
                data={this.state.list}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.historyId}
                renderItem={({item}) => {
                    return <TouchableOpacity onPress={() => this.onPressItem(item)}>
                        {item.template!==null?<View style={styles.list}>
                            <View>
                                <View style={styles.viewTitle}>
                                    <Text>{(item !== undefined && item.template !== undefined)? item.template.name : ""}</Text>
                                </View>
                                <Text>----------------------------------------------------------------------</Text>
                                <View style={styles.viewItem}>
                                    <Text>Ngày quét: </Text>
                                    <Text>{new Date(item.date).getDate()}/{new Date(item.date).getMonth()}/{new Date(item.date).getFullYear()}</Text>
                                </View>
                                <View style={styles.viewItem}>
                                    <Text>Trạng thái: </Text>
                                    <Text>{item.state!==null?"Đã mua":"Chưa mua"}</Text>
                                </View>
                            </View>
                        
                        </View>:""}
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
    viewItem: {
        flexDirection: 'row',
        justifyContent: 'space-between'   
    },
    viewTitle: {
        flexDirection: 'row',
        justifyContent: 'center'   
    },
    titleList: {
        fontSize: 20
    },
    image: {
        height: 70,
        width: 70,
    }

});