import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Components/Home';
import store from './Components/Store';
import {observer} from 'mobx-react';

export default observer(class App extends React.Component {
  render() {
    return (
        <Home store={store}/>
    );
  }
})
