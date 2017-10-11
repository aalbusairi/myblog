import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Button, Form, Item, Input } from 'native-base';
import { ListView } from 'react-native';
import { Image } from 'react-native';
import {observer} from 'mobx-react';
import myStore from './Store';

export default observer(class ListApi extends Component {

  constructor(props) {
  super(props);
  this.state = {
      url: "http://139.59.119.40/api/list/?format=json",
      dataSource: new ListView.DataSource({
        rowHasChanged:(row1, row2) => row1 !== row2,
      }),
      detailUrl: "",
      detailState: false,
      object: "",
      updateUrl: "http://139.59.119.40/api/update/",
      title: "",
      postcontent: "",
      author: myStore.username,
      draft: false,
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

  detailButtonPress(e, url){
    this.setState({
      detailUrl: url,
      detailState: true,
    }, function(){
      console.log("detailUrl: "+this.state.detailUrl);
      console.log("detailState: "+this.state.detailState);
      this.fetchDataDetail();
    });
  }

  renderItem(object){
    return (
      <ListItem>
        <Text>{object.id}</Text>
        <Button
        onPress={(e) => this.detailButtonPress(e, object.detail)}
        iconRight light><Text>Detail</Text></Button>
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

  fetchDataDetail(){
    console.log("this.state.detailUrl: "+this.state.detailUrl);
    fetch(this.state.detailUrl)
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      this.setState({
        object: response
      },function(){
        console.log(this.state.object)
      })
    })
    .catch((error) => console.log(error)).done();
  }

  updatePost(e){
    console.log("UPDATING....");
    console.log("POSTING TITLE: "+this.state.title);
    console.log("POSTING POSTCONTENT: "+this.state.postcontent);
    fetch("http://139.59.119.40/api/update/"+this.state.object.slug,{
     method: 'POST',
     headers: {
       'Accept':'application/json',
       'Content-Type':'application/json',
       'Authorization':'JWT ' + myStore.token,
     },
     body: JSON.stringify({
       "title": this.state.title,
       "content": this.state.postcontent,
       "draft": this.state.draft,
     })}

   ).then((res)=> res.json())
   .then((res)=>  {
       console.log(res)
     }).catch((error)=> console.log(error)).done();
   }


  render() {
    if (this.state.detailState == false){
    return (
      <Container>
          <List>
            <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderItem.bind(this)}
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
    } else {
      return(
        <Container>
        <Text>{this.state.object.title}, {this.state.object.slug}</Text>
        <Text> Update a post! {"\n"} </Text>
          <Form>
            <Item>
              <Input label='title' placeholder='title' value={this.state.title} onChangeText={text => this.setState({ title: text })} style={{fontFamily: "Gill Sans"}} />
            </Item>
            <Item>
              <Input disabled label='author' placeholder={this.state.author} value={this.state.author} style={{fontFamily: "Gill Sans"}} />
            </Item>
            <Item>
              <Input autoCapitalize="sentences" label='postcontent' placeholder='content' value={this.state.postcontent} onChangeText={text => this.setState({ postcontent: text })} style={{fontFamily: "Gill Sans"}} />
            </Item>
            <Button
            onPress={this.updatePost.bind(this)}
            full primary><Text>Update</Text></Button>
          </Form>
        </Container>
      )
    }
    }
})
