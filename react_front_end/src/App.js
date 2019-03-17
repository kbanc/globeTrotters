import React, { Component } from 'react';
import './App.css';
import Loginscreen from './loginscreen';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginPage: [],
      uploadScreen: [],
      mapScreen: []
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
        {this.state.mapScreen}
      </div>
    );
  }
}

export default App;
