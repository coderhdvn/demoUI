import React from "react";
import {
  StyleSheet,
  View
} from "react-native";
import Icon from "react-native-ionicons";

const pressSearch = () => {
    console.log('search');
  }

const pressHome = () => {
    console.log('home');
  }

const pressAccount = () => {
    console.log('account');
  }

const TaskBar = () => {

    return (
    <View style={styles.homebar}> 
        <View >
          <Icon name="search" style={styles.icon} size={50} onPress={pressSearch}></Icon>
        </View>
        <View style={styles.homeIcon}>
          <Icon name="home" style={styles.icon} size={50} onPress={pressHome}></Icon>
        </View>
        <View >
          <Icon name="person" style={styles.icon} size={50} onPress={pressAccount}></Icon>
        </View>
    </View>
    );
}
export default TaskBar;

const styles = StyleSheet.create({
    icon: {
        textAlign: 'center',
        marginTop: 10,
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
});