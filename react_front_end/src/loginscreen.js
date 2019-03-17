import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import Login from './login';
import Register from './register';

const style = {
    margin: 15,
};

class Loginscreen extends Component{
    constructor(props){
        super(props);
        let loginButtons = [];
        loginButtons.push(
            <div>
                <MuiThemeProvider>
                    <div>
                        <RaisedButton label={"Register"} primary={true} style={style} onClick={(event) => this.handleClick(event,'student')}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );

        this.state = {
            username: '',
            password: '',
            loginscreen:[],
            loginmessage:'',
            loginButtons:loginButtons,
            isLogin: true
        }
    }
    componentWillMount(){
        let loginscreen=[];
        loginscreen.push(<Login parentContext={this} appContext={this.props.appContext}/>);
        let loginmessage = "Not registered yet, Register Now";
        this.setState({
            loginscreen:loginscreen,
            loginmessage:loginmessage
        })
    }
    handleClick(event){
        var loginmessage;
        if(this.state.isLogin){
            let loginscreen=[];
            loginscreen.push(<Register parentContext={this} appContext={this.props.appContext}/>);
            loginmessage = "Already registered. Go to Login";
            let loginButtons=[];
            loginButtons.push(
                <div key="login-button">
                    <MuiThemeProvider>
                        <div>
                            <RaisedButton label={"Login"} primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                        </div>
                    </MuiThemeProvider>
                </div>
            )
            this.setState({
                loginscreen:loginscreen,
                loginmessage:loginmessage,
                loginButtons:loginButtons,
                isLogin:false
            })
        }
        else{
            let loginscreen=[],loginButtons=[];
            loginButtons.push(
                <div>
                    <MuiThemeProvider>
                        <div>
                            <RaisedButton label={"Register"} primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                        </div>
                    </MuiThemeProvider>
                </div>
            )
            loginscreen.push(<Login parentContext={this} appContext={this.props.appContext}/>);
            loginmessage = "Not Registered yet. Go to registration";
            this.setState({
                loginscreen:loginscreen,
                loginmessage:loginmessage,
                loginButtons:loginButtons,
                isLogin:true
            })
        }
    }

    render() {
        return (
            <div className="loginscreen" key="loginscreen">
                {this.state.loginscreen}
                <div>
                    {this.state.loginmessage}
                    {this.state.loginButtons}
                </div>
            </div>
        );
    }
}

export default Loginscreen;