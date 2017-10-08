import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Content, Icon, Header, Left, Right, Title, Body, Footer, FooterTab, Button } from 'native-base';
import {observer} from 'mobx-react';
import { NativeRouter, Route , Link } from 'react-router-native';
import auth from './Auth';
import store from './Store';
import MyLogin from './Login';
import MyList from './MyList';
import Create from './Create';
import ListApi from './ListApi';

export default observer(class Home extends Component {

  render() {
    const myFooter =  (
      <Footer>
        <FooterTab>
          <Button><Link to="/a"><View><Icon name="pulse"/></View></Link></Button>
          <Button><Link to="/b"><View><Icon name="paper"/></View></Link></Button>
          <Button><Link to="/d"><View><Icon name="person"/></View></Link></Button>
        </FooterTab>
      </Footer>
    );
    return (
      <NativeRouter>
        <Container>
        <Header>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Route path="/a" component={ListApi} />
        <Route path="/b" component={Create} />
        <Route path="/d" render={() => <MyLogin store={this.props.store} />} />

        {this.props.store.authenticated ? myFooter : <Content><MyLogin store={this.props.store} /></Content>}
        </Container>
      </NativeRouter>
    );

}
})
