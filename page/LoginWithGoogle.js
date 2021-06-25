import React from 'react';
import { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {WebView} from 'react-native-webview';

class LoginWithGoogle extends Component {
    render() {
        return <WebView
            source={{ uri: 'http://192.168.4.111:8082/oauth2/authorize/google?redirect_uri=http://192.168.4.111:8082/login/oauth2/code/google' }}
        />
    }
}

const styles = StyleSheet.create({
});

export default LoginWithGoogle;