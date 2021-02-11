import React from 'react';
import Main from './page/main';
import Account from './page/account';
import {getData} from './storage/AsyncStorage';
import {TOKEN_KEY} from './constants/Constant';

class App extends React.Component {

  state = {
    isToken: false
  }
  
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
    if(this.state.isToken) {
      return <Main></Main>
    } else {
      return <Account></Account>
    }
  }
};

export default App;