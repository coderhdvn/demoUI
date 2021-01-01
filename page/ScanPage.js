import { RNCamera } from 'react-native-camera';
import React from 'react';
import { Image } from 'react-native';
import { View } from 'native-base';

export default class ScanPage extends React.Component {
    render(){
        return (
            <RNCamera ref={ref => {this.camera = ref; }} style={{flex: 1, width: '100%',}}>
                <View style={{width:100, height:100, borderWidth:2, borderColor: "red"}}></View>
            </RNCamera>
        )
    }
}