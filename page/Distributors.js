import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
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

    getCompany = async (distributorId) => {
      const headers = await this.getHeader();

      try {
        const response = await API.get(`/account/companies/${distributorId}`, {headers})
        return response.data
      } catch (err) {
        console.error(err.message);
      }
    }

    setDistributors = async () => {
      const headers = await this.getHeader();
      
      const productId = this.props.route.params.productId;
      console.log(productId);
      try {
        const response = await API.get(`/logger/distributes/${productId}/10/0`, {headers});

        let distributors = response.data;

        distributors.forEach(async item => {
          let location = {
            latitude: item.latitude,
            longitude: item.longitude
          }

          let company = await this.getCompany(item.distributorId);

          let distributor = {
            id: item.id,
            location,
            company,
            image: "https://cdn.logojoy.com/wp-content/uploads/2018/05/01104836/1751.png",
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

    onPressDistributor = async (id) => {
      let distributor = this.state.distributors.filter(distributor => distributor.id === id)[0];

      this.setState({
        click_company: distributor.company,
        modalVisible: true
      });
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
                  <TouchableOpacity style={styles.listView} onPress={() => this.onPressDistributor(item.id)}>
                    <View>
                      <Image
                        source={{uri: item.image}}
                        style={styles.image}
                      />
                      
                    </View>
                    
                    <View style={styles.textView}>
                      <Text style={styles.textName}>{item.company.name}</Text>
                      <Text style={styles.textAddress}>{item.company.detailAddress}</Text>
                    </View>
                  </TouchableOpacity>
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
              onPress={() => {this.props.navigation.navigate('map')}}
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
          
          <Modal
            visible={this.state.modalVisible}
            animationType="slide"
            transparent={true}
          >
            <View style={styles.modalView}>
              <View style={styles.viewInModal}>
                <Image
                        source={{uri: this.state.click_company.image}}
                        style={styles.imageInModal}
                      />
                <Text style={styles.textModal}>Tên công ty: {this.state.click_company.name}</Text>
                <Text style={styles.textModal}>Địa chỉ: {this.state.click_company.detailAddress}</Text>
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
              </View>
            </View>
          </Modal>

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
    margin: 15
  },
  image: {
    height: 100,
    width: 100,
    borderColor: BASIC_COLOR,
    borderWidth: 1,
    borderRadius: 100
  },
  textView: {
    flexShrink: 1,
    marginLeft: 10
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  viewInModal: {
    backgroundColor: "#f7f7f7", 
    borderRadius: 10, 
    padding: 10, 
    width: "90%", 
    shadowColor: BASIC_COLOR,
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.9,
    elevation: 20,
  },
  textModal: {
    color: BASIC_COLOR
  },
  imageInModal: {
      height: 100,
      width: 100,
      borderColor: BASIC_COLOR,
      borderWidth: 1,
      borderRadius: 100,
      alignSelf: 'center'
  }
});