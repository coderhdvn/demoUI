import { BASIC_COLOR } from '../constants/Constant';
import { Input, Button, Header, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet, Image } from 'react-native';
import SockJS from 'sockjs-client';
import Stomp from "webstomp-client";
import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {getData} from '../storage/AsyncStorage';
import {TOKEN_KEY} from '../constants/Constant';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';

export default class ChatService extends Component {
    state = {
        content: '',
        avatar: 'https://scontent-amt2-1.xx.fbcdn.net/v/t1.6435-9/122469842_1457455527781397_7485145288424862265_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=3IHWvoCH3YYAX9L8l99&_nc_ht=scontent-amt2-1.xx&oh=ade32b8984a234d5773f5d43150f2a61&oe=60AF4293',
        messages: [],
        stompClient: '',
        data: {
            senderId: 2,
            recipientId: 1,
            senderName: 'lamthon',
            recipientName: 'anhtu'
        },
        currentDay: "",
        connected: false
    }

    getDayTime(timestamp) {
        let date = new Date(timestamp);
        let time = `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`;
        let day = `${('0'+date.getDate()).slice(-2)}/${('0'+(date.getMonth()+1)).slice(-2)}/${date.getFullYear()}`;
        return [time, day];
    }

    getHeader = async() => {
      
        // const token = "Bearer " + await getData(TOKEN_KEY);
        const token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY0ODEzNzY5MCwiaWF0IjoxNjE2NjAxNjkwfQ.ezk9cf5ZaCMRDl_ZdLgLwd3zlTCr5_gM1t4kc4tm9BAgpF7ubmUOs3lvLs-3GiLdZR0XFNZtAq7bcgaQ_potBw"
  
        const headers = {
          'Authorization': token
        }
        
        return headers
      }

    getMessage(messageOutput){
        let [time, day] = this.getDayTime(messageOutput.timestamp);
        let messages = { ...messageOutput, time, day }
        this.setState({
            messages: [...this.state.messages, messages]
        });
    }

    async getMessageFromDB() {
        const headers = await this.getHeader();

        try {
            const response = await axios.get(`http://192.168.1.183:8084/messages/${this.state.data.senderId}/${this.state.data.recipientId}`, {headers});
            let messages = response.data.map(item => {
                let [time, day] = this.getDayTime(item.timestamp);
                return {...item, time, day}
            });
            console.log(messages);
            
            this.setState({ messages })
        } catch (err) {
            showMessage({
                message: "Lỗi kết nối !",
                type: 'danger',
                description: "Hãy kiểm tra lại kết nối mạng",
                duration: 5000,
                floating: true,
                icon: {
                  icon: 'danger', position: "right"
                },
              })
        }
    }

    async componentDidMount(){
        this.connect();
        await this.getMessageFromDB();
    }

    connect(){
        let props = this;
        const socket = new SockJS('http://192.168.1.183:8084/ws');
        let stompClient = Stomp.over(socket);
        stompClient.connect({}, function(frame) {
        console.log("Connected: " + frame);
        props.setState({ connected: true });
        stompClient.subscribe(`/user/${props.state.data.senderId}/queue/messages`, (messageOutput) => {
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

    sendMessage() {
        if (this.state.connected) {
            let message = {
                ...this.state.send, 
                content: this.state.content, 
            }
    
            this.state.stompClient.send("/app/chat", JSON.stringify(message), {});
            
            let id = Math.random().toString(36).substr(2, 9);
            let [time , day] = this.getDayTime(new Date())
            this.setState({
                content: '',
                messages: [...this.state.messages, 
                    { ...message, id, time, day, senderId: this.state.data.senderId}
                ]
            })
        } else {
            showMessage({
                message: "Gửi tin nhắn không thành công !",
                type: 'danger',
                description: "Hãy kiểm tra lại kết nối mạng",
                duration: 5000,
                floating: true,
                icon: {
                  icon: 'danger', position: "right"
                },
              })
        }
    }

    renderDay = day => {
        if (day !== this.state.currentDay) {
            this.state.currentDay = day;
            return (
                <View style={{ paddingTop: 10}}>
                    <Text style={{ color: 'gray', fontSize: 12, textAlign: 'center' }}>{day}</Text>
                </View>
            )
        }
    }

    renderMessages = (item) => (
        <View style={{paddingLeft: 10, paddingRight: 10}}>
            {
                this.renderDay(item.day)
            }
            {
                item.senderId != this.state.data.senderId
                ? <View style={styles.messagesLeft}>
                    <View>
                        <Image
                            source={{uri: this.state.avatar}}
                            style={{height: 40, width: 40, borderRadius: 50}}
                        />
                        <Text style={{ color: BASIC_COLOR, fontSize: 10, textAlign: 'center' }}>{item.senderName}</Text>
                    </View>
                    <View style={styles.messageContentLeft}>
                        <Text style={{ color: BASIC_COLOR }}>
                            {item.content}
                        </Text>
                        <Text style={{ color: 'gray', fontSize: 9, textAlign: 'right' }}>
                            {item.time}
                        </Text>
                    </View>
                </View>
                : <View style={styles.messagesRight}>
                    <View style={styles.messageContentRight}>
                        <Text style={{ color: 'white' }}>
                            {item.content}
                        </Text>
                        <Text style={{ color: '#85ffed', fontSize: 9, textAlign: 'right' }}>
                            {item.time}
                        </Text>
                    </View>
                </View>
            }
            
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
                       data={this.state.messages} 
                       keyExtractor={item => item.id}
                       renderItem={({item}) => this.renderMessages(item)}
                       showsVerticalScrollIndicator={false}
                        inverted
                       contentContainerStyle={{flexDirection: "column-reverse"}}
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
                            onChangeText={(value) => this.setState({ content: value })}
                            value={this.state.content}
                            style={styles.textInput}
                            placeholder="Nhập ở đây..."
                            autoCapitalize="none"
                        />
                        {
                            this.state.content !== '' &&
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
                                onPress={this.sendMessage.bind(this)}
                            />
                        }
                        
                    
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
        justifyContent: 'space-around',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 40,
        borderColor: BASIC_COLOR,
        margin: 7,
        flex: 1,
        padding: 7
    },
    messagesLeft: {
        width: '70%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    messageContentLeft: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        marginLeft: 10,
        marginBottom: 5
    },
    messageContentRight: {
        backgroundColor: BASIC_COLOR,
        borderRadius: 20,
        padding: 10,
        marginLeft: 60,
        alignSelf: 'flex-end',
        marginBottom: 5
    }
  });
