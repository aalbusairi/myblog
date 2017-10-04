import React, { Component } from 'react';
import { Container, Header, Content, Input, Item, Button, Text } from 'native-base';
import {observer} from 'mobx-react';

export default observer(class Create extends Component {

  render() {
    return (
      <Container>
        <Content>
          <Item regular>
            <Input placeholder='Title' />
          </Item>
            <Item regular>
              <Input placeholder='Content' />
          </Item>

          <Button success><Text>Create Post</Text></Button>
        </Content>
      </Container>
    );
  }
})
