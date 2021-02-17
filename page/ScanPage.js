import React, { Component } from "react";

import { View, Dimensions, Text, ScrollView, Image } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-ionicons";


const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class QrCodeCamera extends Component {

  onSuccess(e) {
    console.log("DATA", JSON.stringify(e))
    fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("DATA", JSON.stringify(responseJson))
        this.props.navigation.navigate("Detail", {data: responseJson})
      })
      .catch((error) => {
        console.error(error);
      });
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

  pressSearch() {
    console.log('search');
  }

  pressHome() {
    console.log('home');
  }

  pressAccount() {
    console.log('account');
  }

  pressFolder() {
    console.log('folder');
  }

  pressGallery() {
    console.log('gallery');
  }

  pressHistory() {
    console.log('history');
  }

  render() {
    return (
      <View style={{flex:1}}>
        <QRCodeScanner
          showMarker
          onRead={this.onSuccess.bind(this)}
          cameraStyle={{ height: SCREEN_HEIGHT }}
          customMarker={
            <View style={styles.rectangleContainer}>
              <View style={styles.topOverlay}>
                <Text style={{ fontSize: 30, color: "white" }}>
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
        <View style={styles.listView}> 
            <View style={styles.viewIcon}>
              <Icon name="folder-open" style={styles.icon} size={50} onPress={() => this.pressFolder()}></Icon>
              <Text style={styles.textIcon}>Đã lưu</Text>
            </View>
            <View style={styles.viewIcon}>
              <Icon name="images" style={styles.icon} size={50} onPress={() => this.pressGallery()}></Icon>
              <Text style={styles.textIcon}>Thư viện</Text>
            </View>
            <View style={styles.viewIcon}>
              <Icon name="time" style={styles.icon} size={50} onPress={() => this.pressHistory()}></Icon>
              <Text style={styles.textIcon}>Lịch sử</Text>
            </View>
        </View>

        <View style={styles.homebar}> 
            <View >
              <Icon name="search" style={styles.icon} size={50} onPress={() => this.pressSearch()}></Icon>
            </View>
            <View style={styles.homeIcon}>
              <Icon name="home" style={styles.icon} size={50} onPress={() => this.pressHome()}></Icon>
            </View>
            <View >
              <Icon name="person" style={styles.icon} size={50} onPress={() => this.pressAccount()}></Icon>
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
    height: 90,
    width: 90,
    backgroundColor: '#1CBCC7',
    marginBottom: 40
  },
  icon: {
    textAlign: 'center',
    marginTop: 10,
  },
  listView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textIcon: {
    textAlign: 'center'
  },
  homebar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white'
  },
  homeIcon: {
    height: 90,
    width: 90,
    backgroundColor: 'white',
    borderRadius: 45,
    marginTop: -25
  },
};

export default QrCodeCamera;