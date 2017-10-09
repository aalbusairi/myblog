import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Button } from 'native-base';
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
      }),
      // nextUrl: "hehe",
      // previousUrl: "xD",
    }
  }
  componentWillMount(){
    this.fetchData();
  }
  fetchData(){
    if(this.state.url!=null)
    fetch(this.state.url)
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(response.results),
        nextUrl: response.next,
        previousUrl: response.previous,
      },function(){
        console.log(this.state.dataSource)
      })
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

  nextPage(e){
    console.log("setting '"+this.state.url+"' to '"+this.state.nextUrl+"'\n");
    this.state.url= this.state.nextUrl;
    this.fetchData();
  }

  previousPage(e){
    this.state.url= this.state.previousUrl;
    this.fetchData();
  }
  // change response.next response. previous change this.state.url= new url //

  render() {
    return (
      <Container>
          <List>
            <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderItem}
            />
          </List>
          <Button
          onPress={this.nextPage.bind(this)}
          full primary><Text>Next</Text></Button>
          <Button
          onPress={this.previousPage.bind(this)}
          full primary><Text>Previous</Text></Button>
      </Container>
    );
    }
})
