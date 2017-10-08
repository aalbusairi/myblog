import React, { Component } from 'react';
import { Container, Form, Item, Input, Button, Text, CheckBox } from 'native-base';
import { observer } from "mobx-react";
import auth from './Auth';
import myStore from './Store';

export default observer(class CreateApi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      title: "",
      postcontent: "",
      author: myStore.username,
      draft: false,
      };
  }

  createPost(e){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    var today = yyyy+'-'+mm+'-'+dd;

     fetch("http://139.59.119.40/api/create/",{
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
        "publish": today
      })}

    ).then((res)=> res.json())
    .then((res)=>  {
        console.log(res)
      }).catch((error)=> console.log(error)).done();

    }


  componentDidMount() {
  var self = this;
  setTimeout(() => {
    self.setState({loading: true}); }, 1200);
  }

  DraftControl() {
    this.setState({ draft: !this.state.draft })
  }

  render() {
  return (
    <Container style={{alignSelf: 'stretch'}}>
    <Text> Create a blog post {"\n"} </Text>
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
        onPress={this.createPost.bind(this)}
        full primary><Text>Create</Text></Button>
      </Form>
    </Container>
  )
}
})
