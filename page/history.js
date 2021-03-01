import { Tab } from 'native-base';
import React from 'react';
import { Button } from 'react-native';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

export default class History extends React.Component {
    
    state = {
        list: [
            {
                id: '1',
                title: 'Thông báo 1',
                date: '01/01/2020',
                image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-x-new-1.jpg'
            },
            {
                id: '2',
                title: 'Thông báo 2',
                date: '01/01/2020',
                image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-x-new-1.jpg'
            },
            {
                id: '3',
                title: 'Thông báo 3',
                date: '01/01/2020',
                image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-x-new-1.jpg'
            },
            {
                id: '4',
                title: 'Thông báo 3',
                date: '01/01/2020',
                image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-x-new-1.jpg'
            },
            {
                id: '5',
                title: 'Thông báo 3',
                date: '01/01/2020',
                image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-x-new-1.jpg'
            },
            {
                id: '6',
                title: 'Thông báo 3',
                date: '01/01/2020',
                image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-x-new-1.jpg'
            },
            {
                id: '7',
                title: 'Thông báo 3',
                date: '01/01/2020',
                image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-x-new-1.jpg'
            },
            {
                id: '8',
                title: 'Thông báo 3',
                date: '01/01/2020',
                image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-x-new-1.jpg'
            }
        ]
    }

    onPressItem = (item) => {
        console.log(item)
    }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
            <View style={styles.shadow}>

            </View>
            <View style={styles.circle}>
                <Text style={styles.title}>Lịch sử</Text>
            </View>
            
        </View>
        
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
                                <Text style={styles.titleList}>{item.title}</Text>
                                <Text>{item.date}</Text>
                            </View>
                            <View>
                                <Image 
                                    style={styles.image}
                                    source={{uri: item.image}}
                                />
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
    titleView: {
        height: 120
    },
    circle: {
        backgroundColor: '#E6FDFF',
        height: 200,
        width: 200,
        position: 'absolute',
        alignSelf: 'center',
        top: -35,
        borderRadius: 100
    },
    shadow: {
        backgroundColor: '#B7FBFF',
        height: 300,
        width: 300,
        position: 'absolute',
        top: -82,
        alignSelf: 'center',
        borderRadius: 150
    },
    title: {
        fontSize: 25,
        color: '#22595C',
        alignSelf: 'center',
        top: 75
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