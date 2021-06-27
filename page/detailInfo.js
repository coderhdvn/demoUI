import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
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
export default class DetailInfo extends React.Component {
    
    state = {
      product: {},
      reviews: [],
      reviewSummary : {},
      rating: 0,
      content: '',
      modalVisible: false,
      visible: false
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

    getRating = (rating) => {
      this.setState({rating});
    }

    getDay(timestamp) {
      let date = new Date(timestamp);
      let day = `${('0'+date.getDate()).slice(-2)}/${('0'+(date.getMonth()+1)).slice(-2)}/${date.getFullYear()}`;
      return day;
    }

    onSaveReview = async() => {

      const headers = await this.getHeader();

      if (this.state.rating !== 0) {
        try {
          let feedback = {
            rating: this.state.rating,
            content: this.state.content
          }
          let templateId = this.state.product.templateId;
          const response = await API.post(`/product/feedbacks/${templateId}`, feedback, {headers});
  
          this.setFeedbacks(templateId);
  
          this.setState({modalVisible: false});
  
        } catch (err) {
          console.error(err.message)
        }
      } else {
        showMessage({
          message: "Đánh giá không thành công !",
          type: 'danger',
          description: "Bạn không thể đánh giá 0 sao",
          duration: 5000,
          floating: true,
          icon: {
            icon: 'danger', position: "right"
          },
        })
      }
    }

    setProduct = async (product) => {
      const headers = await this.getHeader();

      let image = await this.getImage(product.template.imageUrl);

         this.setState({
            product: {
              productId: product.id,
              templateId: product.template.id,
              name: product.template.name,
              expDate: this.getDay(product.expDate),
              mfgDate: this.getDay(product.mfgDate),
              producerId: product.template.producerId,
              description: product.template.description,
              image: image
            },
            visible: true
          });
  
          try{
            let response = await API.get(`/account/companies/${this.state.product.producerId}`, {headers});
            let producer = response.data.name;
            this.setState({product: {...this.state.product, producer}})
          } catch (err) {
            console.error(err.message)
          }
    }

    setFeedbacks = async (templateId) => {
      const headers = await this.getHeader();

      this.setState({reviews: []});

      try {
        let response = await API.get(`/product/feedbacks/${templateId}`, {headers});

        let avg = response.data.average_rate;
        let total = response.data.num_feedbacks;
        this.setState({reviewSummary: {avg, total}})

        let feedbacks = response.data.feedbacks;

        if (feedbacks) {
          feedbacks.map(async feedback  => {
            let date = this.getDay(feedback.created_at);

            let review = {
              content: feedback.content,
              rating: feedback.rating,
              created_at: feedback.created_at,
              date
            }
            const customerId = feedback.customerId;

            let response = await API.get(`/account/users/${customerId}`, {headers});
            const customerName = response.data.name;
            review = {...review, customerName};

            this.setState({reviews: [...this.state.reviews, review].sort((a, b) => {return b.created_at - a.created_at})});
          })
        }
      } catch (err) {
        console.error(err.message);
      }
    }

    componentDidMount = async()  => {
      if (this.props.route.params) {
        await this.setProduct(this.props.route.params.product);
        await this.setFeedbacks(this.state.product.templateId);
      }
    }

    UNSAFE_componentWillReceiveProps = async() => {
      if (this.props.route.params) {
        await this.setProduct(this.props.route.params.product);
        await this.setFeedbacks(this.state.product.templateId);
      }
    }

  render(){

    return (
      <View style={styles.container}>
        <View style={styles.contentView}>
          { this.state.visible ? (
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={{backgroundColor: 'rgb(0, 0, 0)'}}>
                    <Image style={{resizeMode: 'contain', width: '100%', height: 200}} source={{uri: this.state.product.image}} />
                </View>
                  
                <View style={{padding: 7}}>
                <View style={{padding: 5}}>              
                      <Text style={styles.textContent}>{this.state.product.name}</Text>

                      <View style={{paddingTop: 5, paddingBottom: 5, flexDirection: 'row'}}>
                        <View>
                          <Rating
                            rating={this.state.reviewSummary.avg}
                            size={20}
                            enableRating={false}
                          />
                        </View>
                      </View>
                      
                      <Text style={styles.textTitle}>Nhà sản xuất: {this.state.product.producer}</Text> 

                      <Text style={styles.textTitle}>Ngày sản xuất: {this.state.product.mfgDate}</Text> 

                      <Text style={styles.textTitle}>Hạn sử dụng: {this.state.product.expDate}</Text> 
                  </View>    

                <View style={{ alignItems: 'center', padding: 7, backgroundColor: 'white', borderRadius: 50, borderColor: BASIC_COLOR, borderWidth: 1}}>
                  <Text style={styles.textTitle}>Mã số :</Text> 
                  <Text style={styles.textTitle}>{this.state.product.productId}</Text> 
                </View>
                  <Button 
                        title="Xem danh sách nhà phân phối"
                        type="outline"
                        icon={
                          <Icon
                            name="list-alt"
                            size={25}
                            color={BASIC_COLOR}
                            style={{padding: 2}}
                          />
                        }
                        titleStyle={{color: BASIC_COLOR, fontSize: 15, padding: 10}}
                        buttonStyle={{borderColor: 'white'}}
                        onPress={() => {
                            this.props.navigation.navigate("distributors", {productId: this.state.product.productId})
                          }}
                  />
                
                  <Text style={{fontSize: 20, fontWeight: 'bold', padding: 5, borderBottomWidth: 1, borderColor: BASIC_COLOR}}>Mô tả</Text>
                  <Text>{this.state.product.description}</Text>
              
              {
              <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{fontSize: 20, fontWeight: 'bold', padding: 5}}>Đánh giá</Text>
                  <Button
                    icon={
                      <Icon
                        name="pencil"
                        size={20}
                        color={BASIC_COLOR}
                      />
                    }
                    title='Thêm đánh giá'
                    type='outline'
                    titleStyle={{color: BASIC_COLOR, fontSize: 15, padding: 10}}
                    buttonStyle={{borderColor: 'white'}}
                    onPress={() => this.setState({modalVisible: true})}
                  />
                </View>

                {
                this.state.modalVisible &&
                <View style={styles.modal}>
                  <Text style={{fontSize: 18, padding: 5, borderBottomWidth: 1, borderColor: BASIC_COLOR, marginBottom: 10}}>Đánh giá của bạn</Text>
                  <Rating
                    size={30}
                    enableRating={true}
                    rating={this.state.rating}
                    getRating={this.getRating}
                  />
                  <Input
                    placeholder='Đánh giá ở đây'
                    onChangeText={value => {
                      this.setState({password: value})
                    }}
                    autoCapitalize="none"
                    inputStyle={{color: BASIC_COLOR}}
                    onChangeText={value => {this.setState({content: value})}}
                  />
                  <Button
                    title="Lưu đánh giá"
                    type="outline"
                    titleStyle={{color: BASIC_COLOR, fontSize: 15, padding: 10}}
                    buttonStyle={{borderRadius: 40, borderColor: BASIC_COLOR, borderWidth: 1}}
                    onPress={this.onSaveReview}
                    icon={
                      <Icon
                        name="save"
                        size={20}
                        color={BASIC_COLOR}
                        style={{padding: 5}}
                      />
                    }
                  />
                </View>
              }
                
                  {this.state.reviews.map((item, index) => {
                    return (
                      <View style={{borderColor: BASIC_COLOR, borderTopWidth: 1, padding: 5}} key={index}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                          <Text style={{fontSize: 18, padding: 5}}>{item.customerName}</Text>
                          <Text style={{fontSize: 13, fontStyle: 'italic', padding: 6, color:'gray'}}>{item.date}</Text>
                        </View>
                        <Rating
                          rating={item.rating}
                          size={25}
                        />  
                        <Text style={{padding: 5}}>{item.content}</Text>
                      </View>
                    )
                    })
                  }

                  {/* <Button
                    icon={
                      <Icon
                        name="caret-down"
                        size={20}
                        color={BASIC_COLOR}
                      />
                    }
                    title='Xem thêm đánh giá'
                    type='outline'
                    titleStyle={{color: BASIC_COLOR, fontSize: 15, padding: 10}}
                    buttonStyle={{borderColor: 'white'}}
                    onPress={() => {}}
                    containerStyle={{padding: 10}}
                  /> */}
              </View>
              }
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