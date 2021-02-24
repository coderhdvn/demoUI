import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

export default class DetailInfo extends React.Component {
    
    state = {
      name: "Iphone X",
      producer: 'Apple',
      expiry_day: '02/02/2020',
      date_of_manufacture: '02/02/2020',
      serial_number: '123456789',
      distributor: ['distributor 1', 'distributor 2', 'distributor 3', 'distributor 4'],
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
            <View style={styles.item}>
            <Text style={styles.textTitle}> * Tên sản phẩm:</Text> 
            {/* <Text style={styles.textContent}> {this.props.route.params.data.title} </Text> */}
            <Text style={styles.textContent}>{this.state.name}</Text>
            </View>
            <View style={styles.item}>
            <Text style={styles.textTitle}> * Nhà sản xuất:</Text> 
            {/* <Text style={styles.textContent}> {this.props.route.params.data.description}</Text> */}
            <Text style={styles.textContent}>{this.state.producer}</Text>
            </View>
            <View style={styles.item}>
            <Text style={styles.textTitle}> * Ngày sản xuất:</Text> 
            <Text style={styles.textContent}>{this.state.date_of_manufacture}</Text>
            </View>
            <View style={styles.item}>
            <Text style={styles.textTitle}> * Hạn sử dụng:</Text> 
            {/* <Text style={styles.textContent}> {this.props.route.params.data.title}</Text> */}
            <Text style={styles.textContent}>{this.state.expiry_day}</Text>
            </View>
            <View style={styles.item}>
            <Text style={styles.textTitle}> * Serial number:</Text> 
            <Text style={styles.textContent}>{this.state.serial_number}</Text>
            </View>
            <View style={styles.item}>
            <Text style={styles.textTitle}> * Nhà phân phối:</Text> 
            <FlatList 
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
            />
            </View>

            <View style={styles.item}>
              <Text style={styles.textTitle}> * Mô tả:</Text> 
              <Text style={styles.textContent}>{this.state.description}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.textTitle}> * Hình ảnh:</Text> 
              <Image style={styles.image} source={{uri: this.state.image}} />
            </View>
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
    marginLeft: 50,
    marginRight: 40,
    marginBottom: 10,
    marginTop: 20,
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.2,
    elevation: 20,
    position: 'absolute',
    borderRadius: 2
  },
  shadow: {
    marginLeft: 40,
    marginRight: 50,
    marginBottom: 20,
    marginTop: 30,
    backgroundColor: '#777777',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    elevation: 20,
    borderRadius: 5
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
  item: {
    alignItems: 'center',
    marginBottom: 10
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
    backgroundColor: 'gray',
    marginRight: 10
  },
  image: {
    height: 300,
    width: 300,
    marginTop: 5
  }
});