import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import fetch from 'node-fetch';
import Login from './login';
const api_base_url= "http://localhost:8888/reports";

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            username:'',
            password:''
        }
    }
    handleClick(event){
        let apiUrl = api_base_url+'/create_user';
        let self = this;
        if(this.state.firstname.length>0 && this.state.lastname.length>0 && this.state.email.length>0 && this.state.password.length>0 && this.state.username.length>0){
            fetch(apiUrl,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": '*'
                    },
                    body: JSON.stringify({
                            username: this.state.username,
                            password: this.state.password,
                            email: this.state.email,
                            firstname: this.state.firstname,
                            lastname: this.state.lastname
                        }
                    )
                }).then(my_resp => my_resp.json())
                .then(response =>{
                console.log(response);
                if(response["code"] === 200){
                    alert("User created successfully");
                    let loginscreen=[];
                    loginscreen.push(<Login parentContext={this} appContext={self.props.appContext}/>);
                    let loginmessage = "Not Registered yet. Go to registration";
                    self.props.parentContext.setState({
                        loginscreen:loginscreen,
                        loginmessage:loginmessage,
                        buttonLabel:"Register",
                        isLogin:true
                    });
                }
                else{
                    console.log("Some error occurred: ",response.data.code);
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
        else{
            console.log(this.state.firstname.length>0);
            console.log(this.state.lastname.length>0);
            console.log(this.state.email.length>0);
            console.log(this.state.password.length>0);
            console.log(this.state.username.length>0);
            alert("Input field value is missing");
        }
    }
    componentWillReceiveProps(nextProps){
        console.log("nextProps",nextProps);
    }
    render() {
        return(
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Register"
                        />
                        <TextField
                            hintText="Enter your First Name"
                            floatingLabelText="First Name"
                            onChange = {(event,newValue) => this.setState({firstname:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Last Name"
                            floatingLabelText="Last Name"
                            onChange = {(event,newValue) => this.setState({lastname:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter you email"
                            floatingLabelText="Email Address"
                            onChange = {(event,newValue) => this.setState({email:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter you username"
                            floatingLabelText="Username"
                            onChange = {(event,newValue) => this.setState({username:newValue})}
                        />
                        <br/>
                        <TextField
                            type = "password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event,this.props.role)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}

const style = {
    margin: 15,
};


export default Register;