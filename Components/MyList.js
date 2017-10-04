import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
import {observer} from 'mobx-react';

export default observer(class MyList extends Component {
  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem>
              <Text>Simon Mignolet</Text>
            </ListItem>
            <ListItem>
              <Text>Nathaniel Clyne</Text>
            </ListItem>
            <ListItem>
              <Text>Dejan Lovren</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
})