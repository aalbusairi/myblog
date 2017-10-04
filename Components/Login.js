import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Text, Button } from 'native-base';
import auth from './Auth';
import store from './Store';
import { observer } from "mobx-react";

export default observer(class MyLogin extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  ButtonPress(e){
    auth.login(this.state.username,this.state.password)
  }
  logoutPress(e){
    auth.logout(this.state.username,this.state.password)
  }


render() {

    return (
      <Container>
        <Content>
          <Form>
          <Text>{this.props.store.username}</Text>
            <Item>
              <Input autoCapitalize="none" placeholder="Username"
              onChangeText={ (x) => this.setState({ username: x }) } />
            </Item>
            <Item>
              <Input secureTextEntry={true} placeholder="Password"
              onChangeText={ (x) => this.setState({ password: x }) } />
            </Item>
            <Button
            onPress={this.ButtonPress.bind(this)}
            light><Text>Login</Text></Button>
            <Button
            onPress={this.logoutPress.bind(this)}
            light><Text>Logout</Text></Button>
          </Form>
          </Content>
      </Container>
    );
  }
})
