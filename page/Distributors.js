import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Overlay } from 'react-native-elements';
import { BASIC_COLOR } from '../constants/Constant';
import Draggable from 'react-native-draggable';
import { Dimensions } from 'react-native';
import API from '../api/API';
import {getData} from '../storage/AsyncStorage';
import {TOKEN_KEY} from '../constants/Constant';
import { Modal } from 'react-native';

export default class Distributors extends React.Component {
    
    state = {
      distributors: [],
      modalVisible: false,
      click_company: {}
    }

    getHeader = async() => {
      
      const token = "Bearer " + await getData(TOKEN_KEY);

      const headers = {
        'Authorization': token
      }
      
      return headers
    }

    getBranch = async (distributorId) => {
      const headers = await this.getHeader();

      try {
        const response = await API.get(`/account/branches/${distributorId}`, {headers})
        return response.data
      } catch (err) {
        console.error(err.message);
      }
    }

    setDistributors = async () => {
      const headers = await this.getHeader();
      
      const productId = this.props.route.params.productId;

      try {
        const response = await API.get(`/logger/distributes/${productId}/10/0`, {headers});

        let distributors = response.data;

        distributors.forEach(async item => {

          let branch = await this.getBranch(item.distributorId);

          let distributor = {
            id: item.id,
            branch
          }
          this.setState({
            distributors: [...this.state.distributors, distributor]
          })
        })
      } catch (err) {
        console.error(err.message);
      }
    }

    componentDidMount = () => {
      this.setDistributors();
    }

    onPressDistributor = async (company_id) => {
      const headers = await this.getHeader();
      try {
        const response = await API.get(`/account/companies/${company_id}`, {headers});
        let company = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          detailAddress: response.data.detailAddress,
          image: response.data.image,
          website: response.data.website
        }
        this.setState({
          click_company: company,
          modalVisible: true
        });
      } catch (err) {
        console.error(err.message)
      }
    }

    onPressChat = async (recipient) => {
      this.setState({ modalVisible: false });
      const headers = await this.getHeader();
      try {
        const response = await API.get("/account/users/profile", {headers});
        let data = {
          recipientId: recipient.id,
          recipientName: recipient.name,
          recipientAvatar: recipient.image,
          senderId: response.data.id,
          senderName: response.data.name
        }
        this.props.navigation.navigate('Chat', {data});
      } catch (err) {
        console.error(err.message)
      }
    }

  render(){
    return (
      <View style={styles.container}>

        <View style={styles.shadow}>
          <Text style={styles.title}>DANH SÁCH NHÀ PHÂN PHỐI</Text>
        </View>
        <View style={styles.titleView}>
          <Text style={styles.title}>DANH SÁCH NHÀ PHÂN PHỐI</Text>
        </View>

        <View style={styles.contentView}>
          <FlatList
            showsVerticalScrollIndicator={false}
            // horizontal={true}
            data={this.state.distributors}
            keyExtractor={(data) => data.id}
            renderItem={({item}) => {
              return (
                  <View style={styles.listView}>
                    <View>
                      <Image
                        source={{uri: item.branch.image}}
                        style={styles.image}
                      />
                      <Button
                          icon={
                            <Icon
                              name="building"
                              size={17}
                              color={BASIC_COLOR}
                            />
                          }
                          title='Xem công ty'
                          titleStyle={{color: BASIC_COLOR, fontSize: 12, padding: 5}}
                          buttonStyle={{backgroundColor: 'white'}}
                          onPress={() => {this.onPressDistributor(item.branch.company_id)}}
                      />
                    </View>
                      <View style={styles.textView}>
                        <Text style={styles.textName}>{item.branch.name}</Text>
                        <Text style={styles.textAddress}>{item.branch.address}</Text>
                        <Button
                          icon={
                            <Icon
                              name="comments"
                              size={20}
                              color={BASIC_COLOR}
                            />
                          }
                          title='Liên hệ với chúng tôi'
                          titleStyle={{color: BASIC_COLOR, fontSize: 12, padding: 5}}
                          buttonStyle={{backgroundColor: 'white'}}
                          onPress={() => {this.onPressChat(item.branch)}}
                      />
                        
                      </View>
                    
                  </View>
              )}
            }
          />
            <Button
              icon={
                <Icon
                  name="map"
                  size={30}
                  color='white'
                />
              }
              title='Xem trên bản đồ'
              type='outline'
              titleStyle={{color: 'white', fontSize: 20, padding: 10}}
              containerStyle={{backgroundColor: BASIC_COLOR, alignSelf: 'center', width: '100%'}}
              buttonStyle={{borderColor: BASIC_COLOR}}
              onPress={() => {this.props.navigation.navigate('map', {distributors: this.state.distributors})}}
          />
          <Draggable x={Dimensions.get('window').width - 55} y={100}>
            <Button
                  icon={
                    <Icon
                      name="home"
                      size={35}
                      color='white'
                    />
                  }
                  buttonStyle={{backgroundColor: BASIC_COLOR, borderRadius: 100, width: 50, height: 50}}
                  onPress={() => {this.props.navigation.navigate('Scan')}}
              />
          </Draggable>
          
          <Overlay
            isVisible={this.state.modalVisible}
            overlayStyle={styles.modalView}
          >
              <>
                  <View>
                      <Image
                        source={{uri: this.state.click_company.image}}
                        style={styles.imageInModal}
                      />
                      <Button
                          icon={
                            <Icon
                              name="comments"
                              size={20}
                              color={BASIC_COLOR}
                            />
                          }
                          title='Liên hệ với chúng tôi'
                          titleStyle={{color: BASIC_COLOR, fontSize: 12, padding: 5}}
                          buttonStyle={{backgroundColor: 'white'}}
                          onPress={() => {this.onPressChat(this.state.click_company)}}
                      />
                  </View>
                
                <Text style={styles.textModalTitle}>Tên công ty:</Text>
                <Text style={styles.textModalContent}>{this.state.click_company.name}</Text>

                <Text style={styles.textModalTitle}>Địa chỉ:</Text>
                <Text style={styles.textModalContent}>{this.state.click_company.detailAddress}</Text>

                <Text style={styles.textModalTitle}>Email:</Text>
                <Text style={styles.textModalContent}>{this.state.click_company.email}</Text>

                <Text style={styles.textModalTitle}>Điện thoại:</Text>
                <Text style={styles.textModalContent}>{this.state.click_company.phone}</Text>

                <Text style={styles.textModalTitle}>Website:</Text>
                <Text style={styles.textModalContent}>{this.state.click_company.website}</Text>

                <Button
                  icon={
                    <Icon
                      name="times"
                      size={20}
                      color={BASIC_COLOR}
                    />
                  }
                  title='Đóng'
                  type='outline'
                  titleStyle={{color: BASIC_COLOR, fontSize: 15, padding: 10}}
                  buttonStyle={{borderColor: BASIC_COLOR}}
                  onPress={() => this.setState({modalVisible: false})}
                  containerStyle={{padding: 5}}
                />
                </>
          </Overlay>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BASIC_COLOR,
  },
  contentView: {
    backgroundColor: "#fff",
    borderTopRightRadius: 30,
    flex: 1,
  },
  titleView: {
    alignSelf: 'center',
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.2,
    elevation: 20,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 27
  },
  shadow: {
    backgroundColor: 'black',
    opacity: 0.4,
    borderRadius: 5,
    position: 'absolute',
    top: 27,
    alignSelf: 'center',
    transform: [
      {
        translateX: -7
      }
    ]
  },
  title: {
    color:"black", 
    fontSize:20, 
    width: "100%", 
    textAlign: "center", 
    fontWeight: "300", 
    padding: 10,
  },
  textName: {
    fontSize: 20,
    textAlign: "center", 
    padding: 5,
    fontWeight: 'bold'
  },
  textAddress: {
    fontSize: 15,
  },
  listView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 2,
  },
  textView: {
    flexShrink: 1,
    paddingLeft: 10
  },
  modalView: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '80%'
  },
  textModalContent: {
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingBottom: 10
  },
  textModalTitle: {
    borderTopWidth: 1,
    borderColor: BASIC_COLOR,
    paddingTop: 5,
    paddingLeft: 5,
    marginLeft: 10,
    marginRight: 10
  },
  imageInModal: {
      height: 100,
      width: 100,
      borderColor: BASIC_COLOR,
      borderRadius: 100,
      alignSelf: 'center',
  }
});