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

    getRating = (rating) => {
      this.setState({rating});
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

          let expDate = (new Date(product.expDate)).toLocaleDateString();
          let mfgDate = (new Date(product.mfgDate)).toLocaleDateString();
          this.setState({
            product: {
              productId: product.id,
              templateId: product.template.id,
              name: product.template.name,
              expDate,
              mfgDate,
              producerId: product.template.producerId,
              description: product.template.description,
              image: product.template.imageUrl
            },
            visible: true
          });
  
          try{
            let response = await API.get(`/account/companies/${this.state.product.producerId}`, {headers});
            console.log(response.data)
            let producer = response.data.name;
            console.log(this.state.product.producerId)
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
            let date = (new Date(feedback.created_at)).toLocaleDateString();

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
        <View style={styles.shadow}>
          <Text style={styles.title}>THÔNG TIN SẢN PHẨM</Text>
        </View>
        <View style={styles.titleView}>
          <Text style={styles.title}>THÔNG TIN SẢN PHẨM</Text>
        </View>
        <View style={styles.contentView}>
          { this.state.visible ? (
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '40%', alignSelf: 'center'}}>
                    <Image style={{resizeMode: 'contain', width: '100%', height: 300}} source={{uri: this.state.product.image}} />
                  </View>
                  <View style={{width: '60%', alignSelf: 'center'}}>
                    <Wrap>                   
                      <Text style={styles.textTitle}>Tên sản phẩm:</Text> 
                      <Text style={styles.textContent}>{this.state.product.name}</Text>
                      <Text style={styles.textTitle}>Nhà sản xuất:</Text> 
                      <Text style={styles.textContent}>{this.state.product.producer}</Text>

                      <Text style={styles.textTitle}>Ngày sản xuất:</Text> 
                      <Text style={styles.textContent}>{this.state.product.mfgDate}</Text>

                      <Text style={styles.textTitle}>Hạn sử dụng:</Text> 
                      <Text style={styles.textContent}>{this.state.product.expDate}</Text>
                    </Wrap>
                  </View>
                </View>
                <Wrap>
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
                        buttonStyle={{borderRadius: 40, borderColor: BASIC_COLOR, borderWidth: 1}}
                        onPress={() => {
                            this.props.navigation.navigate("distributors", {productId: this.state.product.productId})
                          }}
                  />
                </Wrap>
                
                  <Text style={{fontSize: 20, fontWeight: 'bold', padding: 5, borderBottomWidth: 1, borderColor: BASIC_COLOR}}>Mô tả</Text>
                  <Text>{this.state.product.description}</Text>
                
              <View style={styles.cardSummary}>
                <Text style={styles.textTitle}>Đánh giá sản phẩm</Text> 
                <Text style={{fontSize: 40, fontWeight: 'bold'}}>{this.state.reviewSummary.avg}</Text>
                <Rating
                  rating={this.state.reviewSummary.avg}
                  size={30}
                  enableRating={false}
                />
                <Text>{this.state.reviewSummary.total} đánh giá</Text>
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
                  containerStyle={{padding: 5}}
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
              { this.state.reviewSummary.total !== 0 &&
              <View>
                <Text style={{fontSize: 20, fontWeight: 'bold', padding: 5}}>Đánh giá</Text>
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

                  <Button
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
                  />
              </View>
              }
            
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
    backgroundColor: BASIC_COLOR,
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
    marginBottom: 27,
    width: "85%"
  },
  shadow: {
    backgroundColor: 'black',
    opacity: 0.4,
    borderRadius: 5,
    position: 'absolute',
    top: 27,
    alignSelf: 'center',
  },
  title: {
      color:"black", 
      fontSize:22, 
      width: "100%", 
      textAlign: "center", 
      fontWeight: "300", 
      padding: 10,
      fontStyle:'italic',
  },

  contentView: {
    backgroundColor: "#fff",
    borderTopRightRadius: 30,
    flex: 1,
  },
  scrollView: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1
  },
  textTitle: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  textContent: {
    fontSize: 18,
    paddingBottom: 15
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