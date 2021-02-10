import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class DetailInfo extends React.Component {
  
  constructor(props) {
    super(props)
  }

  render(){
    return (
      <View style={styles.container}>
            <Text style={{ color:"#FFF", fontSize:25, width: "100%", textAlign: "center", fontWeight: "300", padding: 10}}>THÔNG TIN SẢN PHẨM</Text>
            <ScrollView style={styles.scrollView}>
            <View>
            <Text style={styles.textTitle}> * Tên sản phẩm:</Text> 
            <Text style={styles.textContent}> {this.props.route.params.data.title} </Text>
            </View>
            <View>
            <Text style={styles.textTitle}> * Nhà sản phẩm:</Text> 
            <Text style={styles.textContent}> {this.props.route.params.data.description}</Text>
            </View>
            <View>
            <Text style={styles.textTitle}> * Ngày sản xuất:</Text> 
            <Text style={styles.textContent}> 2/7/2020</Text>
            </View>
            <View>
            <Text style={styles.textTitle}> * Hạn sử dụng:</Text> 
            <Text style={styles.textContent}> {this.props.route.params.data.title}</Text>
            </View>
            <View>
            <Text style={styles.textTitle}> * Serial number:</Text> 
            <Text style={styles.textContent}> 123456</Text>
            </View>
            <View>
            <Text style={styles.textTitle}> * Nhà phân phối:</Text> 
            <Text style={styles.textContent}> Cellphone S</Text>
            </View>
            <View>
            <Text style={styles.textTitle}> * Mô tả:</Text> 
            <Text style={styles.textContent}> Ram 12GB - ROM 64GB</Text>
            </View>

            
        </ScrollView>
        
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00F0FF",
},
  title: {
      margin: 20,
      borderWidth: 2,
  },
  titleContent: {
    fontSize: 22,
  },
  logo:{
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover"
  },
  textTitle: {
      fontSize: 15,
      color: "#6A6464",
      paddingLeft: 20
    },
  textContent: {
    fontSize: 20,
    paddingBottom: 10,
    paddingLeft: 20
    },
    scrollView: {
        backgroundColor: "#fff",
        borderRadius: 15,
        paddingTop: 20
      },
});