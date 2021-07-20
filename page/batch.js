import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Picker} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Wrap from '../components/Wrap';
import { BASIC_COLOR } from '../constants/Constant';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button} from 'react-native-elements';
import Rating from '../components/Rating';
import API from '../api/API';
import {getData} from '../storage/AsyncStorage';
import {TOKEN_KEY} from '../constants/Constant';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';

export default class Batch extends React.Component {
    
    state = {
        batch: {},
        product: {},
        content: '',
        visible: false,
        isSend: false,
        selectedCompany: '',
        selectedBranch: '',
        companies: [],
        branches: [],
        products: [],
        listProducts: []
    }

    getHeader = async() => {
      
      const token = "Bearer " + await getData(TOKEN_KEY);

      const headers = {
        'Authorization': token
      }
      
      return headers
    }

    getImage = async (imageName) => {
      let headers = await this.getHeader();
      try {
        const getUrl = await API.get(`/uploadserver/get_image/${imageName}`, {headers});
        return getUrl.data
        // const response = await axios.create({baseURL: getUrl.data}).get("");
        // let image = response.data.image;
        // return image;
      } catch (err) {
        console.log("image not found")
      }
    }

    getDay(timestamp) {
      let date = new Date(timestamp);
      let day = `${('0'+date.getDate()).slice(-2)}/${('0'+(date.getMonth()+1)).slice(-2)}/${date.getFullYear()}`;
      return day;
    }

    setBatch = async (batch) => {

      const headers = await this.getHeader();
      let image = await this.getImage(batch.template.imageUrl);

      this.setState({
        batch: {
            id: batch.id,
            name: batch.name,
            dateCreated: batch.dateCreated,
            amount: batch.amount,
            sender: batch.sender,
            status: batch.status,
            description: batch.description,
            image: image,
            products: batch.products
        },
        visible: true
    })
  
          try{
            let producerCompany = await API.get(`/account/companies/${batch.template.producerId}`, {headers});
            let producer = producerCompany.data.name;
            this.setState({batch: {...this.state.batch, producer}})
          } catch (err) {
            console.error(err.message)
          }

          try{
            let senderCompany = await API.get(`/account/companies/${batch.sender}`, {headers});
            let sender = senderCompany.data.name;
            this.setState({batch: {...this.state.batch, sender}})
          } catch (err) {
            console.error(err.message)
          }

          try{
            let companies = await API.get(`/account/companies`, {headers});
            this.setState({companies: companies.data})
          } catch (err) {
            console.error(err.message)
          }
    }

    onSelectedCompany = async (companyId) => {
        const headers = await this.getHeader();
        this.setState({selectedCompany: companyId})
        try{
            let selectedCompany = await API.get(`/account/companies/${companyId}`, {headers});
            this.setState({branches: selectedCompany.data.branches})
          } catch (err) {
            console.error(err.message)
          }
    }

    onSendBatch = async() => {
        const headers = await this.getHeader();

        let batch = {
            batchId: this.state.batch.id,
            reciverId: this.state.selectedCompany,
            branchId: this.state.selectedBranch
        }

        try{
           await API.post(`/product/batch`, batch, {headers});
          } catch (err) {
            console.error(err.message)
          }

           let listProducts = []
           for (let i = 0; i < this.state.batch.products.length; i++) {
            listProducts.push(this.state.batch.products[i].id)
          }
          try{
            await API.post(`/logger/distributes/sendlog/${this.state.selectedCompany}/${this.state.selectedBranch}`, listProducts, {headers});
            showMessage({
                message: "Chuyển lô hàng thành công !",
                type: "success",
                duration: 3000,
                floating: true,
                icon: {
                  icon: "success", position: "right"
                },
              })
              this.props.navigation.navigate('Scan')
           } catch (err) {
             console.error(err.message)
             showMessage({
                message: "Chuyển lô hàng thất bại !",
                type: "danger",
                duration: 3000,
                floating: true,
                icon: {
                  icon: "danger", position: "right"
                },
              })
           }
           
    }

    onCanceledBatch = async() => {
      const headers = await this.getHeader();
        let batch = this.props.route.params.batch;
      
        try{
          await API.put(`/product/batch/canceled/${batch.id}`, null, {headers});
          showMessage({
            message: "Hủy đơn hàng thành công !",
            type: "success",
            duration: 3000,
            floating: true,
            icon: {
              icon: "success", position: "right"
            },
          })
          this.props.navigation.navigate('Scan')

         } catch (err) {
           console.error(err.message)
       }

    }

    componentDidMount = async()  => {
      if (this.props.route.params) {
        await this.setBatch(this.props.route.params.batch);
      }
    }

    UNSAFE_componentWillReceiveProps = async() => {
      if (this.props.route.params) {
        await this.setBatch(this.props.route.params.batch);
      }
    }

  render(){

    return (
      <View style={styles.container}>
        <View style={styles.contentView}>
        { this.state.visible ? (
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={{backgroundColor: 'rgb(0, 0, 0)'}}>
                    <Image style={{resizeMode: 'contain', width: '100%', height: 200}} source={{uri: this.state.batch.image}} />
                </View>
                  
                <View style={{padding: 7}}>
                <View style={{padding: 5}}>              
                      <View style={styles.content}>
                        <Text style={{fontWeight: "bold"}}>Tên lô hàng: </Text> 
                        <Text>{this.state.batch.name}</Text> 
                      </View>

                      <View style={styles.content}>
                        <Text style={{fontWeight: "bold"}}>Công ty gởi: </Text> 
                        <Text>{this.state.batch.sender}</Text> 
                      </View>

                      <View style={styles.content}>
                        <Text style={{fontWeight: "bold"}}>Nhà sản xuất: </Text> 
                        <Text>{this.state.batch.producer}</Text> 
                      </View>
                      
                      <View style={styles.content}>
                        <Text style={{fontWeight: "bold"}}>Ngày tạo lô hàng: </Text> 
                        <Text>{this.state.batch.dateCreated.slice(0,10)} {this.state.batch.dateCreated.slice(11,19)}</Text> 
                      </View>
                
                      <View style={styles.content}>
                        <Text style={{fontWeight: "bold"}}>Số lượng sản phẩm: </Text> 
                        <Text>{this.state.batch.amount}</Text> 
                      </View>

                      <View style={styles.content}>
                      <Text style={{fontWeight: "bold"}}>Trạng thái: </Text>
                      <Text>{this.state.batch.status}</Text>
                      </View>

                      <View style={styles.content}>
                      <Text style={{fontWeight: "bold"}}>Mô tả:</Text>
                      <Text>{this.state.batch.description}</Text>

                      </View>
                  </View>   
                  <Text style={{paddingLeft: 25}}>--------------------------------------------------------------------</Text>
                  <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                      <Button 
                            title=" Chuyển tiếp lô hàng"
                            icon={
                              <Icon
                                name="list-alt"
                                size={14}
                                color={'white'}
                                style={{padding: 2}}
                              />
                            }
                            titleStyle={{color: 'white', fontSize: 12}}
                            buttonStyle={{borderColor: 'white', backgroundColor: '#546dea', margin: 10}}
                            onPress={() => {
                                this.setState({isSend: true})
                              }}
                      />
                      <Button 
                            title="Từ chối nhận hàng"
                            icon={
                              <Icon
                                name="trash"
                                size={15}
                                color={'white'}
                                style={{padding: 2}}
                              />
                            }
                            titleStyle={{color: 'white', fontSize: 12}}
                            buttonStyle={{borderColor: 'white', backgroundColor: 'darkred', margin: 10, marginRight: 15}}
                            onPress={() => {
                                this.onCanceledBatch()
                              }}
                      />

                    </View> 
                  
                {this.state.isSend ? (
                  <View >
                      <Text style={{fontWeight: 'bold', marginTop: 10}}>Chọn nơi nhận lô hàng:</Text>
                      <Picker
                            selectedValue={this.state.selectedCompany}
                            style={{ height: 50, width: "70%" }}
                            onValueChange={(itemValue, itemIndex) => this.onSelectedCompany(itemValue)}
                        >
                            <Picker.Item label="Tên công ty" value="" />
                            {this.state.companies.map((item, index) => {
                                return (
                                        <Picker.Item label={item.name} value={item.id} />
                                )})
                            }     
                        </Picker>
                        {this.state.selectedCompany !== '' ? (
                            <View>
                                <Text style={{fontWeight: 'bold', marginTop: 10}}>Chọn chi nhánh:</Text>
                                <Picker
                                        selectedValue={this.state.selectedBranch}
                                        style={{ height: 50, width: "70%" }}
                                        onValueChange={(itemValue, itemIndex) => this.setState({selectedBranch: itemValue})}
                                    >
                                        <Picker.Item label="Tên chi nhánh" value="" />
                                        {this.state.branches.map((item, index) => {
                                            return (
                                                    <Picker.Item label={item.name} value={item.id} />
                                            )})
                                        }     
                                    </Picker>
                            </View>
                            
                        
                        )
                        : (
                            <Text></Text>
                        )}

                        {this.state.selectedBranch !== '' ? (
                                 <Button 
                                 title="Chuyển đi"
                                 icon={
                                   <Icon
                                     name="send"
                                     size={25}
                                     color={'white'}
                                     style={{padding: 2}}
                                   />
                                 }
                                 titleStyle={{color: 'white', fontSize: 15}}
                                 buttonStyle={{borderColor: 'white', backgroundColor: '#549ddf', marginHorizontal: '25%'}}
                                 onPress={() => {
                                     this.onSendBatch()
                                   }}
                           />
                                ):(<Text></Text>)
                            }
                        
                     
                  </View>
                ):(<Text/>)}
                </View>
            
             </ScrollView> ) : (
                <TouchableOpacity style={{flex: 1, justifyContent: 'center'}} 
                  onPress={() => this.props.navigation.navigate('Scan')}>
                  <Icon
                    name="qrcode"
                    size={200}
                    color={BASIC_COLOR}
                    style={{alignSelf: 'center'}}
                  />
                  <Text style={{fontSize: 25, alignSelf: 'center', color: BASIC_COLOR}}>Hãy quét mã QR</Text>
                </TouchableOpacity>
            )
        }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
},
  titleView: {
    // elevation: 10,
    // borderRadius: 5,
    // marginTop: 10,
    // marginBottom: 10,
    // width: "80%",
    // backgroundColor: 'white',
    // alignSelf: 'center'
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: BASIC_COLOR,
    width: '90%',
    alignSelf: 'center'
  },
  content: {
    flexDirection: "row", 
    justifyContent: "space-between",
    marginBottom: 5
  },

  title: {
      color:"black", 
      fontSize: 22, 
      width: "100%", 
      textAlign: "center", 
      fontWeight: "300", 
      padding: 10,
      // fontStyle:'italic',
  },

  contentView: {
    backgroundColor: "white",
    // borderTopRightRadius: 30,
    flex: 1,
  },
  scrollView: {
    flex: 1
  },
  textTitle: {
    fontSize: 13,
    marginBottom: 2
  },
  textContent: {
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  cardSummary: {
    borderWidth:1, 
    borderColor: BASIC_COLOR, 
    alignItems: 'center', 
    margin: 20,
    borderRadius: 10,
    padding: 10
  },
  modal: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: BASIC_COLOR,
    padding: 10
  }
});