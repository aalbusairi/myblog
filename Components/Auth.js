import {observer} from 'mobx-react';
import store from './Store';
import {AsyncStorage} from 'react-native';

const auth = observer(new class auth {

  login(username,password){
    this.getToken(username,password)
  }

  logout(){
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('username')
    store.authenticated = false
    store.token = ""
    store.username = ""
  }

  firstLoad() {
    if (this.loggedIn) {
      AsyncStorage.getItem('token').then((x) => store.token = x)
      store.authenticated = true
      AsyncStorage.getItem('username').then((x) => store.username = x)
    }
  }

  loggedIn(){
    AsyncStorage.getItem('token', (err,result) => {
      if (!err && result != null){
        return true
      }
      else {
        return false
      }
    })
  }

  getToken(username,password){
     fetch("http://139.59.119.40/api/login/", {
           method: 'POST',
           headers: {
             'Accept': 'application/json',
             'Content-Type':'application/json',
           },
           body: JSON.stringify({
             "username": username,
             "password": password
           })}
         ).then((res) => res.json())
          .then((res) => {
           store.authenticated = true
           store.token = res.token
           store.username = res.username
           AsyncStorage.setItem('token', res.token);
           AsyncStorage.setItem('username', res.username);
           console.log(res.username)
         }).catch((error) => console.log(error)).done();
      }
    })

export default auth;
