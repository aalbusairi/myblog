import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
import { ListView } from 'react-native';
import { Image } from 'react-native';


export default class Api extends Component {
  constructor(props) {
  super(props);
  this.state = {
      url: "https://api.github.com/events",
      dataSource: new ListView.DataSource({
        rowHasChanged:(row1, row2) => row1 !== row2,
      })
    }
  }
  componentWillMount(){
    console.log(this.props.store.authenticated)
    this.fetchData();
  }
  fetchData(){
    fetch(this.state.url)
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      this.setState({dataSource: this.state.dataSource.cloneWithRows(response)},function(){console.log(this.state.dataSource)})
    })
    .catch((error) => console.log(error)).done();
  }
  renderItem(object){
    return (
      <ListItem>
        <Text>{object.actor.id}</Text>
        <Image source={{uri: object.actor.avatar_url }} style={{height: 100, width: null, flex: 1}}/>
      </ListItem>
    )
  }
  render() {
  if (this.props.store.authenticated == true ) {
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
    } else {
        return(
          <Text>Must Login</Text>
      )
    }
  }
}
