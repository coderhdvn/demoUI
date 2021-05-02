import { BASIC_COLOR } from '../constants/Constant';
import { Input, Button, Header, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet, Image } from 'react-native';
import SockJS from 'sockjs-client';
import Stomp from "webstomp-client";
import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

export default class ChatService extends Component {
    state = {
        message: '',
        avatar: 'https://scontent-amt2-1.xx.fbcdn.net/v/t1.6435-9/122469842_1457455527781397_7485145288424862265_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=3IHWvoCH3YYAX9L8l99&_nc_ht=scontent-amt2-1.xx&oh=ade32b8984a234d5773f5d43150f2a61&oe=60AF4293',
        receive_message: [
            {"id":"4baab773-2af4-4fb6-8172-d39cbfcfc828",
            "chatId":"1_2",
            "senderId":"1",
            "recipientId":"2",
            "senderName":"anhtu",
            "recipientName":"lam",
            "content":"okie lun k maf",
            "timestamp":'16:24:09, 2/5/2021',
            "status":"RECEIVED",
            },
            {"id":"4baab773-2af4-4fb6-8172-d39cbfcfc825",
            "chatId":"1_2",
            "senderId":"1",
            "recipientId":"2",
            "senderName":"anhtu",
            "recipientName":"lam",
            "content":"okie lun k mafdfdfdfdsfdsfsdfdfdfdfdfdfdfdfdfdfdfdfdfdfdf",
            "timestamp":'16:24:09, 2/5/2021',
            "status":"RECEIVED",
            },
            
            
        ],
        stompClient: ''
    }

    getMessage(messageOutput){
        this.setState({
            receive_message: [...this.state.receive_message, messageOutput]
        });
    }

    componentDidMount(){
        this.connect();
    }

    connect(){
        let props = this;
        const socket = new SockJS('http://192.168.1.183:8084/ws');
        let stompClient = Stomp.over(socket);
        stompClient.connect({}, function(frame) {
        console.log("Connected: " + frame);
        stompClient.subscribe(`/user/2/queue/messages`, (messageOutput) => {
            props.getMessage(JSON.parse(messageOutput.body));
        })
        });
        this.setState({
            stompClient
        })
    }

    pressHome = () => {
        this.props.navigation.navigate('Main');
    }

    renderMessages = (item) => (
        <View style={styles.messages}>
            <View>
                <Image
                    source={{uri: this.state.avatar}}
                    style={{height: 40, width: 40, borderRadius: 50}}
                />
                <Text style={{ color: BASIC_COLOR, fontSize: 10, textAlign: 'center' }}>{item.senderName}</Text>
            </View>
            <View style={styles.messageContent}>
                <Text style={{ color: BASIC_COLOR }}>
                    {item.content}
                </Text>
                <Text style={{ color: 'gray', fontSize: 10, textAlign: 'right' }}>
                    {item.timestamp}
                </Text>
            </View>
        </View>
    )

    render(){
        return (
            <View style={styles.container}>
                <Header
                    centerComponent={{ text: 'Chat', style: { color: '#fff', fontSize: 20 } }}
                    rightComponent={{ icon: 'home', color: 'white', size: 30, onPress: this.pressHome}}
                    containerStyle={{
                        backgroundColor: BASIC_COLOR
                    }}
                />

                    <FlatList
                       data={this.state.receive_message} 
                       keyExtractor={item => item.id}
                       renderItem={({item}) => this.renderMessages(item)}
                       showsVerticalScrollIndicator={false}
                       contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end', padding: 5}}
                    />

                <View style={styles.input}>
                        <Button
                            icon={
                            <Icon
                                name="plus-circle"
                                size={30}
                                color={BASIC_COLOR}
                            />
                            }
                            type='outline'
                            buttonStyle={{borderColor: 'white'}}
                        />
                        <TextInput
                            onChangeText={(value) => this.setState({ message: value })}
                            value={this.state.message}
                            style={styles.textInput}
                            placeholder="Nhập ở đây..."
                        />
                        <Button
                            icon={
                            <Icon
                                name="paper-plane"
                                size={30}
                                color={BASIC_COLOR}
                            />
                            }
                            type='outline'
                            titleStyle={{color: 'white', fontSize: 20, padding: 30}}
                            buttonStyle={{borderColor: 'white'}}
                        />
                    
                </View>
                
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ededed'
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 40,
        borderColor: BASIC_COLOR,
        margin: 5,
        flex: 1,
        padding: 7
    },
    content: {
        flex: 1,
        borderWidth: 1,
        justifyContent: 'space-between' 
    },
    messages: {
        width: '70%',
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center'
    },
    messageContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginLeft: 10
    }
  });
