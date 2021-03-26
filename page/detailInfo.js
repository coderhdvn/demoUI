import React from 'react';
import { Button } from 'react-native';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Wrap from '../components/Wrap';
import { getData } from '../storage/AsyncStorage';
import {TOKEN_KEY} from '../constants/Constant';

export default class DetailInfo extends React.Component {
    
    state = {
      name: "Iphone X",
      producer: 'Apple',
      expiry_day: '02/02/2020',
      date_of_manufacture: '02/02/2020',
      serial_number: '123456789',
      distributor: ['Công ty 1', 'Công ty 2', 'Công ty 3', 'Công ty 4'],
      description: 'Ram 12GB - ROM 64GB',
      image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-x-new-1.jpg'
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
                <Wrap>
                  <Text style={styles.textTitle}> * Tên sản phẩm:</Text> 
              {/* <Text style={styles.textContent}> {this.props.route.params.data.title} </Text> */}
                  <Text style={styles.textContent}>{this.state.name}</Text>
                </Wrap>

              <Wrap>
                <Text style={styles.textTitle}> * Nhà sản xuất:</Text> 
            {/* <Text style={styles.textContent}> {this.props.route.params.data.description}</Text> */}
                <Text style={styles.textContent}>{this.state.producer}</Text>
              </Wrap>

              <Wrap>
                <Text style={styles.textTitle}> * Ngày sản xuất:</Text> 
                <Text style={styles.textContent}>{this.state.date_of_manufacture}</Text>
              </Wrap>

              <Wrap>
                <Text style={styles.textTitle}> * Hạn sử dụng:</Text> 
            {/* <Text style={styles.textContent}> {this.props.route.params.data.title}</Text> */}
                <Text style={styles.textContent}>{this.state.expiry_day}</Text>
              </Wrap>

              <Wrap>
                <Text style={styles.textTitle}> * Serial number:</Text> 
                <Text style={styles.textContent}>{this.state.serial_number}</Text>
              </Wrap>

              <Wrap>
                <Text style={styles.textTitle}> * Nhà phân phối:</Text> 
                {/* <FlatList 
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={this.state.distributor}
                  keyExtractor={(data) => data}
                  renderItem={({item}) => {
                  return (
                    <View style={styles.listView}>
                      <Text style={styles.textContent}>{item}</Text>
                    </View>
                  )
                }}
                /> */}
                <Button 
                  style={styles.btnShow}
                  title="Xem danh sách nhà phân phối"
                  onPress={ async () => {
                      // this.props.navigation.navigate("distributors")
                      const token = getData(TOKEN_KEY);
                      console.log(token);
                    }}
                />
              </Wrap>

              <Wrap>
                <Text style={styles.textTitle}> * Mô tả:</Text> 
                <Text style={styles.textContent}>{this.state.description}</Text>
              </Wrap>

              <Wrap>
                <Text style={styles.textTitle}> * Hình ảnh:</Text> 
                <Image style={styles.image} source={{uri: this.state.image}} />
              </Wrap>
            </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00F0FF",
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
  },
  titleContent: {
    fontSize: 22,
  },
  textTitle: {
      fontSize: 15,
      color: "#6A6464",
      marginTop: 10
    },
  textContent: {
    fontSize: 20,
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
  listView: {
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'grey',
    marginRight: 10,
    borderRadius: 5,
    padding: 10
  },
  image: {
    height: 300,
    width: 300,
    marginTop: 5
  },
  btnShow: {
    borderRadius: 5
  }
});