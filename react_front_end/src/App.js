import React, { Component } from 'react';
//import logo from './logo.svg'; If we want to have a rendering logo
import './App.css';
import Loginscreen from './loginscreen';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginPage: [],
      uploadScreen: []
    }
  }
  componentWillMount() {
    let loginPage = [];
    loginPage.push(<Loginscreen appContext={this}/>)
    this.setState({
      loginPage: loginPage
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.loginPage}
        {this.state.uploadScreen}
      </div>
    );
  }
}

export default App;
