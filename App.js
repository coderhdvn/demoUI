import React from 'react';
import Main from './page/main';
import Account from './page/account';
import {getData} from './storage/AsyncStorage';
import {TOKEN_KEY} from './constants/Constant';
import { ImageBackground } from 'react-native';
// import OneSignal from 'react-native-onesignal';

class App extends React.Component {

  state = {
    isToken: false
  }

  // constructor(properties) {
  //   super(properties);
  //   //Remove this method to stop OneSignal Debugging 
  //   OneSignal.setLogLevel(6, 0);
    
  //   // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
  //   OneSignal.init("0e6352b4-fdb3-4480-bb12-ca5b511cfa44", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
  //   OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.
  
  //    OneSignal.addEventListener('received', this.onReceived);
  //    OneSignal.addEventListener('opened', this.onOpened);
  //    OneSignal.addEventListener('ids', this.onIds);
  // }
  //   componentWillUnmount() {
  //     OneSignal.removeEventListener('received', this.onReceived);
  //     OneSignal.removeEventListener('opened', this.onOpened);
  //     OneSignal.removeEventListener('ids', this.onIds);
  //   }
  
  //   onReceived(notification) {
  //     console.log("Notification received: ", notification);
  //   }
  
  //   onOpened(openResult) {
  //     console.log('Message: ', openResult.notification.payload.body);
  //     console.log('Data: ', openResult.notification.payload.additionalData);
  //     console.log('isActive: ', openResult.notification.isAppInFocus);
  //     console.log('openResult: ', openResult);
  //   }
  
  //   onIds(device) {
  //     console.log('Device info: ', device);
  //   }
  
  
  componentDidMount() {
    getData(TOKEN_KEY).then(token => {
      if(token != null) {
        this.setState({isToken: true})
      }
    })
  }

  render() {
    /* check token
      if not or expired token => redirect Login Screen
      else go to Main Screen */
    return (
        <Account wasLogedIn = {this.state.isToken}/>
    )
    
    /*  if(this.state.isToken) {
      return <Account></Account>
    } else {
      return <Account></Account>
    }*/
  }
};

export default App;