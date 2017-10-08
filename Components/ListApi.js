import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
import { ListView } from 'react-native';
import { Image } from 'react-native';
import {observer} from 'mobx-react';
import store from './Store';

export default observer(class ListApi extends Component {

  constructor(props) {
  super(props);
  this.state = {
      url: "http://139.59.119.40/api/list/?format=json",
      dataSource: new ListView.DataSource({
        rowHasChanged:(row1, row2) => row1 !== row2,
      })
    }
  }
  componentWillMount(){

    this.fetchData();
  }
  fetchData(){
    fetch(this.state.url)
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      this.setState({dataSource: this.state.dataSource.cloneWithRows(response.results)},function(){console.log(this.state.dataSource)})
    })
    .catch((error) => console.log(error)).done();
  }
  renderItem(object){
    return (
      <ListItem>
        <Text>{object.id}</Text>
      </ListItem>
    )
  }
  render() {
    return (
      <Container>
          <List>
            <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderItem}
            />
          </List>

      </Container>
    );
    }
})
