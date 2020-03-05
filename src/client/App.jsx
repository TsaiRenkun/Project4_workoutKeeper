import React from 'react';
import { hot } from 'react-hot-loader';
import Cookies from 'universal-cookie';
import BodyPart from './bodypart.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  constructor(){
    console.log("constructing");
      super()
    this.state = {
      cookie: ""
      } 
    }

  getCookie(){
    const cookies = new Cookies();
    cookies.get('userId');
    if(cookies){
    this.setState({cookie: cookies})
    }
  }

  render() {
    const cookies = new Cookies();
    cookies.get('userId');
    console.log(cookies)
    return (
      <div>
        Welcome.
        hello
        <BodyPart/>
      </div>
    );
  }
}

export default hot(module)(App);
