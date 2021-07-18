import React, { Component } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text } from "react-native";
import ListBatches from './listBatches';


const Tab = createMaterialTopTabNavigator();

class BatchHistory extends React.Component {
  
    render(){
      return (   
        <Tab.Navigator>
            <Tab.Screen name="Lô hàng đã nhận" component={ReceivedBatch} />
            <Tab.Screen name="Lô hàng đã gửi" component={SentBatch} />
        </Tab.Navigator>
        );
      }
}

export default BatchHistory;

export class SentBatch extends React.Component {
  
    render(){
      return (
        <ListBatches isSentBatch={true}/>
        );
      }
}

export class ReceivedBatch extends React.Component {
  
    render(){
      return (
        <ListBatches/>
        );
      }
}
