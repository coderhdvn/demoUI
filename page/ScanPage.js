import React, { Component } from "react";

import { View, Dimensions, Text } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import * as Animatable from "react-native-animatable";
import { BASIC_COLOR } from '../constants/Constant';
import Icon from 'react-native-vector-icons/FontAwesome';
import Geolocation from '@react-native-community/geolocation';
import API from '../api/API';
import {getData} from '../storage/AsyncStorage';
import {TOKEN_KEY, ONESIGNAL_APP_ID} from '../constants/Constant';
import { showMessage } from "react-native-flash-message";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from 'react-native-elements';
import OneSignal from 'react-native-onesignal';

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class QrCodeCamera extends Component {
  state = {
    scan: true,
    location: {
      latitude: 0,
      longitude: 0
    }
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
        // showMessage({
        //   message: "Không thể định vị vị trí của bạn !",
        //   type: 'danger',
        //   description: "Hãy chắc chắn rằng bạn đang bật định vị",
        //   duration: 5000,
        //   floating: true,
        //   icon: {
        //     icon: 'danger', position: "right"
        //   },
        // })
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
    console.log("body nek", body);
    const response = await API.post('/logger/consumes', body, {headers});
    console.log(response.data);
  }

  onSuccess = async (e) => {
    let productId = e.data;
    this.setState({scan: false});
    console.log(e);
    let headers = await this.getHeader();

    try {
      const response = await API.get(`/product/products/${productId}`, {headers});
        console.log(response)
        if (response /*&& this.state.location !== null*/) {
          this.saveHistory(productId);
          this.props.navigation.navigate("detail", {product: response.data});
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

  pressSearchProduct() {
    this.setState({ scan: false })
    this.props.navigation.navigate("Search Product");
  }

  pressGallery() {
    console.log('gallery');
  }

  pressHistory() {
    this.setState({ scan: false })
    this.props.navigation.navigate('history');
  }

  updateOneSignalId = async (OneSignalId) => {
    const headers = await this.getHeader();

    try {
      const response = await API.put(`/account/users/onesignal/${OneSignalId}`, null, {headers});
      // console.log(response.data);
    } catch (err) {
      console.error(err.message);
    }
  }

  initNotification = async () => {
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId(ONESIGNAL_APP_ID);
    
    let deviceState = await OneSignal.getDeviceState();
    await this.updateOneSignalId(deviceState.userId);

    OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
      console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
      let notification = notificationReceivedEvent.getNotification();

      showMessage({
        message: 'Thông báo',
        type: 'info',
        description: `${notification.title}: ${notification.body}`,
        duration: 5000,
        floating: true,
        icon: {
          icon: 'info', position: "right"
        },
      })
    });

  }

  componentDidMount = async () => {
    await this.getLocation();
    await this.initNotification();
  }

  render() {
    return (
      <View style={{flex:1}}>
        {this.state.scan ? (
        <QRCodeScanner
          //cameraTimeout={5000} 
          reactivate={true}
          showMarker={true}
          onRead={(e)=>{this.onSuccess(e)}}
          cameraStyle={{ height: SCREEN_HEIGHT }}
          customMarker={
            <View style={styles.rectangleContainer}>
              <View style={styles.topOverlay}>
                <Text style={{fontSize: 15, color: "white", fontStyle: 'italic', padding: 10, width: '100%', textAlign: 'center' }}>
                Di chuyển vùng quét đến vị trí mã QR 
                </Text>
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
                      name="camera"
                      size={40}
                      color={BASIC_COLOR}
                    />
                  }
                  title='Nhấn để bật camera'
                  type='outline'
                  titleStyle={{color: BASIC_COLOR, fontSize: 20, padding: 10}}
                  buttonStyle={{borderColor: 'white'}}
                  onPress={() => this.setState({ scan: true })}
                />
          </View>
        )
        }
        <View style={styles.listView}> 
            <TouchableOpacity style={styles.viewIcon} onPress={() => this.pressSearchProduct()}>
              <Icon name="search" style={styles.icon} size={40}></Icon>
              <Text style={styles.textIcon}>Tìm kiếm</Text>
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
    marginBottom: -80
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