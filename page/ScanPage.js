import React, { Component } from "react";

import { View, Dimensions, Text } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import * as Animatable from "react-native-animatable";
import { BASIC_COLOR } from '../constants/Constant';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class QrCodeCamera extends Component {
  state = {
    scan: false
  }

  onSuccess(e) {
    let productId = e.data;
    // let productId = "ad8752e6-b149-4d1d-b8b0-ac0bcf096f52"
    this.setState({scan: false});
    this.props.navigation.navigate("detail", {productId});
    
  }

  activeQR = () => {
    this.setState({ scan: true });
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

  render() {
    return (
      <View style={{flex:1}}>
        {this.state.scan &&
        <QRCodeScanner
          reactivate={true}
          showMarker={true}
          onRead={this.onSuccess.bind(this)}
          cameraStyle={{ height: SCREEN_HEIGHT }}
          customMarker={
            <View style={styles.rectangleContainer}>
              <View style={styles.topOverlay}>
                <Text style={{ fontSize: 30, color: "white", fontStyle: 'italic' }}>
                  QR CODE SCANNER
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
        />
        }
        {!this.state.scan &&
          <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
            <Button
            title="Quét lại mã QR"
            type="outline"
            icon={
              <Icon
                name="qrcode"
                size={30}
                color={BASIC_COLOR}
                style={{padding: 2}}
              />
            }
            titleStyle={{color: BASIC_COLOR, fontSize: 15, padding: 10}}
            buttonStyle={{borderRadius: 40, borderColor: BASIC_COLOR, borderWidth: 1}}
            onPress={this.activeQR}
            />
          </View>
        }
        <View style={styles.listView}> 
            <View style={styles.viewIcon}>
              <Icon name="save" style={styles.icon} size={50} onPress={() => this.pressFolder()}></Icon>
              <Text style={styles.textIcon}>Đã lưu</Text>
            </View>
            <View style={styles.viewIcon}>
              <Icon name="image" style={styles.icon} size={50} onPress={() => this.pressGallery()}></Icon>
              <Text style={styles.textIcon}>Thư viện</Text>
            </View>
            <View style={styles.viewIcon}>
              <Icon name="history" style={styles.icon} size={50} onPress={() => this.pressHistory()}></Icon>
              <Text style={styles.textIcon}>Lịch sử</Text>
            </View>
        </View>

      </View>
    );
  }
}

const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = "green";

const scanBarWidth = SCREEN_WIDTH * 0.4; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.005; //this is equivalent to 1 from a 393 device width
const scanBarColor = "#22ff00";

const iconScanColor = "blue";

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
    alignItems: "center"
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

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor
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
    height: 100,
    width: 100,
    backgroundColor: "white",
    marginBottom: 40,
    borderRadius: 100,
    borderColor: BASIC_COLOR,
    borderWidth: 1
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