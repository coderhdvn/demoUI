import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { BASIC_COLOR } from '../constants/Constant';
import Draggable from 'react-native-draggable';
import { Dimensions } from 'react-native';

export default class Distributors extends React.Component {
    
    state = {
      distributors: [
          {
            name: "Cong ti 1",
            address: "Chung cư Hùng Vương, Lô G, Tản Đà, Phường 11, Quận 5, Thành phố Hồ Chí Minh, Vietnam",
            image: "https://cdn.logojoy.com/wp-content/uploads/2018/05/01104836/1751.png"
          },
          {
            name: "Cong ti 2",
            address: "Chung cư Hùng Vương, Lô G, Tản Đà, Phường 11, Quận 5, Thành phố Hồ Chí Minh, Vietnam",
            image: "https://lh3.googleusercontent.com/proxy/S2M3fc1hwiJrO4aYsjuulC0k5y4W-lFDxBuw7Hsj0nld_UvJnglEdEK10MR6bvEcIXbZVeQe1cP5suazLIwxAG0WpEV4nQUNI9u5M0z_6OeQFrpfKzGOI86bcihQLQlEHA"
          },
          {
            name: "Cong ti 3",
            address: "Chung cư Hùng Vương, Lô G, Tản Đà, Phường 11, Quận 5, Thành phố Hồ Chí Minh, Vietnam",
            image: "https://cdn.logojoy.com/wp-content/uploads/2018/05/01104836/1751.png"
          },
          {
            name: "Cong ti 4",
            address: "Chung cư Hùng Vương, Lô G, Tản Đà, Phường 11, Quận 5, Thành phố Hồ Chí Minh, Vietnam",
            image: "https://cdn.logojoy.com/wp-content/uploads/2018/05/01104836/1751.png"
          },
          {
            name: "Cong ti 5",
            address: "Chung cư Hùng Vương, Lô G, Tản Đà, Phường 11, Quận 5, Thành phố Hồ Chí Minh, Vietnam",
            image: "https://cdn.logojoy.com/wp-content/uploads/2018/05/01104836/1751.png"
          },
          {
            name: "Cong ti 6",
            address: "Chung cư Hùng Vương, Lô G, Tản Đà, Phường 11, Quận 5, Thành phố Hồ Chí Minh, Vietnam",
            image: "https://cdn.logojoy.com/wp-content/uploads/2018/05/01104836/1751.png"
          }
      ],
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
            keyExtractor={(data) => data.name}
            renderItem={({item}) => {
              return (
                  <View style={styles.listView}>
                    <View>
                      <Image
                        source={{uri: item.image}}
                        style={styles.image}
                      />
                      
                    </View>
                    
                    <View style={styles.textView}>
                      <Text style={styles.textName}>{item.name}</Text>
                      <Text style={styles.textAddress}>{item.address}</Text>
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
              title='Xem bản đồ'
              type='outline'
              titleStyle={{color: 'white', fontSize: 20, padding: 5}}
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
  }
});