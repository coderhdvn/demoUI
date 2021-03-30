import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Wrap from '../components/Wrap';
import { BASIC_COLOR} from '../constants/Constant';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button} from 'react-native-elements';
import Rating from '../components/Rating';
export default class DetailInfo extends React.Component {
    
    state = {
      name: "Iphone X",
      producer: 'Apple',
      expiry_day: '02/02/2020',
      date_of_manufacture: '02/02/2020',
      serial_number: '123456789',
      description: "Sau thành công của Samsung Galaxy A51 với mức doanh số khá tốt thì trong năm 2020, Samsung lại tiếp tục cho ra mắt mẫu smartphone Galaxy A52 với những cải tiến về hệ thống camera cũng như được trang bị cấu hình mạnh mẽ cho trải nghiệm tuyệt vời.",
      image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-x-new-1.jpg',
      reviews: [
        {
          id: '1',
          user: 'Anh Tu',
          rating: 4,
          comment: 'Very good'
        },
        {
          id: '2',
          user: 'Nhat Lam',
          rating: 2,
          comment: "In reception they don't speak English and every time I need help or I don't understand they roll their eyes, they are extremely rude and on top of that they lost my results once."
        }
      ],
      reviewSummary : {},
      rating: 0,
      comment: '',
      modalVisible: false
    }

    cal_Review_Summary() {
      let total = this.state.reviews.length;
      let sum = this.state.reviews.reduce((a, b) => a.rating + b.rating);
      let avg = Math.round(sum / total);
      let reviewSummary = {total, avg}
      this.setState({ reviewSummary })
    }

    getRating = (rating) => {
      this.setState({rating});
    }

    onSaveReview = () => {
      console.log(this.state.rating + this.state.comment);
      this.setState({modalVisible: false})
    }

    componentDidMount() {
      this.cal_Review_Summary();
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
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '40%', alignSelf: 'center'}}>
                    <Image style={{resizeMode: 'contain', width: '100%', height: 300}} source={{uri: this.state.image}} />
                  </View>
                  <View style={{width: '60%'}}>
                    <Wrap>                   
                      <Text style={styles.textTitle}>Tên sản phẩm:</Text> 
                      <Text style={styles.textContent}>{this.state.name}</Text>
                      <Text style={styles.textTitle}>Nhà sản xuất:</Text> 
                      <Text style={styles.textContent}>{this.state.producer}</Text>

                      <Text style={styles.textTitle}>Ngày sản xuất:</Text> 
                      <Text style={styles.textContent}>{this.state.date_of_manufacture}</Text>

                      <Text style={styles.textTitle}>Hạn sử dụng:</Text> 
                      <Text style={styles.textContent}>{this.state.expiry_day}</Text>

                      <Text style={styles.textTitle}>Serial number:</Text> 
                      <Text style={styles.textContent}>{this.state.serial_number}</Text>
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
                            this.props.navigation.navigate("distributors")
                          }}
                  />
                </Wrap>
                
                  <Text style={{fontSize: 20, fontWeight: 'bold', padding: 5, borderBottomWidth: 1, borderColor: BASIC_COLOR}}>Mô tả</Text>
                  <Text>{this.state.description}</Text>
                
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
                    onChangeText={value => {this.setState({comment: value})}}
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

              <Text style={{fontSize: 20, fontWeight: 'bold', padding: 5}}>Đánh giá</Text>
              {
                this.state.reviews.map((item, index) => {
                  return (
                    <View style={{borderColor: BASIC_COLOR, borderTopWidth: 1, padding: 5,}}>
                      <Text style={{fontSize: 18, padding: 5}}>{item.user}</Text>
                      <Rating
                        rating={item.rating}
                        size={25}
                      />  
                      <Text style={{padding: 5}}>{item.comment}</Text>
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
                  title='More reviews'
                  type='outline'
                  titleStyle={{color: BASIC_COLOR, fontSize: 15, padding: 10}}
                  buttonStyle={{borderColor: 'white'}}
                  onPress={() => {}}
                  containerStyle={{padding: 10}}
                />

            </ScrollView>
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
      fontSize:25, 
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
    paddingBottom: 10
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