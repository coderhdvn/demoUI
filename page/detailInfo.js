import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Wrap from '../components/Wrap';
import { getData } from '../storage/AsyncStorage';
import {TOKEN_KEY, BASIC_COLOR} from '../constants/Constant';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated from 'react-native-reanimated';
import { Input, Button } from 'react-native-elements';

const MAX_STARS = 5;

export default class DetailInfo extends React.Component {
    
    state = {
      name: "Iphone X",
      producer: 'Apple',
      expiry_day: '02/02/2020',
      date_of_manufacture: '02/02/2020',
      serial_number: '123456789',
      distributor: ['Công ty 1', 'Công ty 2', 'Công ty 3', 'Công ty 4'],
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
      rating: 3,
      reviewSummary : {}
    }

    rate = star => {
      this.setState({ rating: star });
    }

    showRating = (rating) => {
      let stars = [];

      for(let i = 1; i <= MAX_STARS; i++) {
        stars.push(
          <Star
            filled = { i <= rating ? true : false }
          />
        )
      }
      return <View style={{flexDirection: 'row'}}>{stars}</View>
    }

    cal_Review_Summary() {
      let total = this.state.reviews.length;
      let sum = this.state.reviews.reduce((a, b) => a.rating + b.rating);
      let avg = Math.round(sum / total);
      let reviewSummary = {total, avg}
      this.setState({ reviewSummary })
    }

    componentDidMount() {
      this.cal_Review_Summary();
    }

  render(){
    let stars = []

      for(let x = 1; x <= 5; x++) {
        stars.push(
          <TouchableWithoutFeedback
            key={x}
            onPress={() => {
              this.rate(x);
            }}
          >
            <Animated.View>
              <Star
                filled = {x <= this.state.rating ? true : false}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        )
      }
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
                {
                  this.showRating(this.state.reviewSummary.avg)
                }
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
                  onPress={() => {}}
                  containerStyle={{padding: 5}}
                />
              </View>

              <Text style={{fontSize: 20, fontWeight: 'bold', padding: 5}}>Đánh giá</Text>
              {
                this.state.reviews.map((item) => {
                  return (
                    <View style={{borderColor: BASIC_COLOR, borderTopWidth: 1, padding: 5,}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', padding: 5}}>{item.user}</Text>
                        {
                          this.showRating(item.rating)
                        }
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

class Star extends React.Component {
  render () {
    return <Icon
      name={this.props.filled === true ? "star": "star-o"}
      color={BASIC_COLOR}
      size={25}
      style={{ marginHorizontal: 6 }}
    />
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

  }
});