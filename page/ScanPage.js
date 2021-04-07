import React, { Component } from "react";

import { View, Dimensions, Text } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import * as Animatable from "react-native-animatable";
import { BASIC_COLOR } from '../constants/Constant';
import Icon from 'react-native-vector-icons/FontAwesome';
import Geolocation from '@react-native-community/geolocation';
import API from '../api/API';
import {getData} from '../storage/AsyncStorage';
import {TOKEN_KEY} from '../constants/Constant';
import { showMessage } from "react-native-flash-message";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from 'react-native-elements';

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class QrCodeCamera extends Component {
  state = {
    scan: true,
    location: null
  }

  getHeader = async() => {
      
    const token = "Bearer " + await getData(TOKEN_KEY);

    const headers = {
      'Authorization': token
    }
    
    return headers
  }

  getLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        this.setState({ location: { latitude, longitude }})
      },
      error => {
        showMessage({
          message: "Không thể định vị vị trí của bạn !",
          type: 'danger',
          description: "Hãy chắc chắn rằng bạn đang bật định vị",
          duration: 5000,
          floating: true,
          icon: {
            icon: 'danger', position: "right"
          },
        })
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }

  saveHistory = async (productId) => {
    let body = {
      productId,
      latitude: this.state.location.latitude,
      longitude: this.state.location.longitude
    }
    let headers = await this.getHeader();

    const response = await API.post('/logger/consumes', body, {headers});
    console.log(response.data);
  }

  onSuccess = async (e) => {
    let productId = e.data;
    this.setState({scan: false});

    let headers = await this.getHeader();

    try {
      const response = await API.get(`/product/products/${productId}`, {headers});
        if (response && this.state.location !== null) {
          this.props.navigation.navigate("detail", {product: response.data});
          this.saveHistory(productId);
        }
    } catch (err) {
      showMessage({
        message: "Quét mã không thành công !",
        type: 'danger',
        description: "Mã QR không đúng. Hãy thử lại.",
        duration: 5000,
        floating: true,
        icon: {
          icon: 'danger', position: "right"
        },
      })
    }
    this.setState({scan: true});
  }

  makeSlideOutTranslation(translationType, fromValue) {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.33
      },
      to: {
        [translationType]: fromValue
      }
    };
  }

  pressFolder() {
    console.log('folder');
  }

  pressGallery() {
    console.log('gallery');
  }

  pressHistory() {
    console.log('history');
    this.props.navigation.navigate('history');
  }

  componentDidMount = async () => {
    await this.getLocation();
  }

  render() {
    return (
      <View style={{flex:1}}>
        {this.state.scan ? (
        <QRCodeScanner
          // cameraTimeout={10000} 
          reactivate={true}
          showMarker={true}
          onRead={this.onSuccess.bind(this)}
          cameraStyle={{ height: SCREEN_HEIGHT }}
          customMarker={
            <View style={styles.rectangleContainer}>
              <View style={styles.topOverlay}>
                {/* <Text style={{ fontSize: 30, color: BASIC_COLOR, fontStyle: 'italic', backgroundColor: 'white', padding: 10, width: '100%', textAlign: 'center' }}>
                  QR CODE SCANNER
                </Text> */}
              </View>

              <View style={{ flexDirection: "row" }}>
                <View style={styles.leftAndRightOverlay} />

                <View style={styles.rectangle}>
                  <Animatable.View
                    style={styles.scanBar}
                    direction="alternate-reverse"
                    iterationCount="infinite"
                    duration={1700}
                    easing="linear"
                    animation={this.makeSlideOutTranslation(
                      "translateY",
                      SCREEN_WIDTH * 0.33
                    )}
                  />
                </View>

                <View style={styles.leftAndRightOverlay} />
              </View>

              <View style={styles.bottomOverlay} />
            </View>
          }
        />) : (
          <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
            <Button
                  icon={
                    <Icon
                      name="spinner"
                      size={40}
                      color={BASIC_COLOR}
                    />
                  }
                  title='Đang quét'
                  type='outline'
                  titleStyle={{color: BASIC_COLOR, fontSize: 20, padding: 10}}
                  buttonStyle={{borderColor: 'white'}}
                />
          </View>
        )
        }
        <View style={styles.listView}> 
            <TouchableOpacity style={styles.viewIcon} onPress={() => this.pressFolder()}>
              <Icon name="save" style={styles.icon} size={40}></Icon>
              <Text style={styles.textIcon}>Đã lưu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewIcon} onPress={() => this.pressGallery()}>
              <Icon name="image" style={styles.icon} size={40}></Icon>
              <Text style={styles.textIcon}>Thư viện</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewIcon} onPress={() => this.pressHistory()}>
              <Icon name="history" style={styles.icon} size={40}></Icon>
              <Text style={styles.textIcon}>Lịch sử</Text>
            </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = 'white';

const scanBarWidth = SCREEN_WIDTH * 0.4; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.005; //this is equivalent to 1 from a 393 device width
const scanBarColor = BASIC_COLOR;

const styles = {
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -50
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor
  },

  logo: {
    resizeMode: 'contain',
    scaleX: 0.6,
    scaleY: 0.6,
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor
  },

  text : {
    color:"white",
    fontSize: 16,
    textAlign: "center",
    justifyContent: "center",
  },
  viewIcon: {
    justifyContent: 'center',
    height: 80,
    width: 80,
    backgroundColor: "white",
    marginBottom: 40,
    borderRadius: 10,
  },
  icon: {
    alignSelf: 'center',
    color: BASIC_COLOR,
  },
  listView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textIcon: {
    textAlign: 'center',
    color: BASIC_COLOR
  },
};

export default QrCodeCamera;