import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import fetch from 'node-fetch';
import UploadPage from './uploadpage';

const api_base_url= "http://localhost:8888/reports";

class Login extends Component {
    constructor(props){
        super(props);
        let localloginComponent=[];
        localloginComponent.push(
            <MuiThemeProvider>
                <div>
                    <TextField
                        hintText="Username"
                        onChange = {(event,newValue)=>this.setState({username:newValue})}
                    />
                    <br/>
                    <TextField
                        type="password"
                        hintText="Enter your Password"
                        floatingLabelText="Password"
                        onChange = {(event,newValue) => this.setState({password:newValue})}
                    />
                    <br/>
                    <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                </div>
            </MuiThemeProvider>
        );
        this.state={
            username:'',
            password:'',
            loginComponent:localloginComponent
        }
    }
    componentWillMount() {
        let localloginComponent=[];
        localloginComponent.push(
            <MuiThemeProvider>
                <div>
                    <TextField
                        hintText="Enter Username"
                        floatingLabelText="User Name"
                        onChange = {(event,newValue) => this.setState({username:newValue})}
                    />
                    <br/>
                    <TextField
                        type="password"
                        hintText="Enter Password"
                        floatingLabelText="Password"
                        onChange = {(event,newValue) => this.setState({password:newValue})}
                    />
                    <br/>
                    <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                </div>
            </MuiThemeProvider>
        );
        this.setState({loginComponent:localloginComponent})
    }

    async handleClick(event){
        let apiUrl = api_base_url+'/get_auth';
        let self = this;
        await fetch(apiUrl,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": '*'
                },
                body: JSON.stringify({
                        username: this.state.username,
                        password: this.state.password,
                    }
                )
            }).then(my_response=> my_response.json()).then( my_data => {
                console.log(my_data);
            if (my_data["code"] === 200){
                let uploadScreen=[];
                uploadScreen.push(<UploadPage appContext={self.props.appContext} role={self.state.loginRole}/>)
                self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
            }
            else if (my_data["code"] === 204){
                console.log("Username password do not match");
                alert(my_data.data.success)
            }
            else{
                console.log(my_data["code"]);
                console.log("Username does not exists");
                alert("Username does not exist");
            }
        }).catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <AppBar
                        title="Login"
                    />
                </MuiThemeProvider>
                {this.state.loginComponent}
            </div>
        );
    }
}

const style = {
    margin: 15,
};

export default Login;