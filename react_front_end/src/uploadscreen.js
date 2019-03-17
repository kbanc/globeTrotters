import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import cloud from './cloud.svg';
import {ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Input from '@material-ui/core/Input';
import RaisedButton from 'material-ui/RaisedButton';
import {blue500} from 'material-ui/styles/colors';

import fetch from 'node-fetch';
import TextField from 'material-ui/TextField';

const api_base_url= "http://localhost:8888/reports";

class Uploadscreen extends Component{
    constructor(props){
        super(props);
        let load_image = [];
        load_image.push(
            <img src={cloud} alt=""/>
        );
        let image_component=[];
        image_component.push(
            <MuiThemeProvider>
                <div>
                    <TextField
                        hintText="Longitude"
                        defaultValue=""
                        onChange = {(event,newValue)=>this.setState({longitude:newValue})}
                    />
                    <br/>
                    <TextField
                        hintText="Latitude"
                        defaultValue=""
                        onChange = {(event,newValue) => this.setState({latitude:newValue})}
                    />
                    <br/>
                    <TextField
                        hintText="Location"
                        defaultValue=""
                        onChange = {(event,newValue) => this.setState({location:newValue})}
                    />
                    <br/>
                </div>
            </MuiThemeProvider>
        );
        this.state = {
            longitude: '',
            latitude: '',
            data: '',
            date: '',
            location: '',
            datatype: 'image',
            file: '',
            filepreview: '',
            image_component: image_component,
            loadingImage: load_image,
            draweropen:false,
            printingmessage:'',
            printButtonDisabled:false
        }
    }

    handleUpload = event => {
        let load_image = [];
        let image_component = [];
        load_image.push(
            <img src={logo} alt=""/>)
        ;

        this.setState({
            image_component: image_component,
            loadingImage: load_image,
            printingmessage:"Please wait till your file is being uploaded",
            printButtonDisabled:true}
            );

        if (this.state.file !== ''){
            let api_url = api_base_url+'/create_raw_report';
            fetch(api_url,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": '*'
                    },
                    body: JSON.stringify({
                            image: this.state.file,
                            tweet: null,
                            longitude: this.state.longitude,
                            latitude: this.state.latitude,
                            data: this.state.data,
                            datatype: this.state.datatype,
                            location: this.state.location,
                        }
                    ),
                }).then(data => {
                    if (data["status"] === 200){
                        let load_image = [];
                        let image_component=[];
                        image_component.push(
                            <MuiThemeProvider>
                                <div>
                                    <TextField
                                        hintText="Longitude"
                                        defaultValue=""
                                        onChange = {(event,newValue)=>this.setState({longitude:newValue})}
                                    />
                                    <br/>
                                    <TextField
                                        hintText="Latitude"
                                        defaultValue=""
                                        onChange = {(event,newValue) => this.setState({latitude:newValue})}
                                    />
                                    <br/>
                                    <TextField
                                        hintText="Location"
                                        defaultValue=""
                                        onChange = {(event,newValue) => this.setState({location:newValue})}
                                    />
                                    <br/>
                                </div>
                            </MuiThemeProvider>
                        );
                        load_image.push(
                            <img src={cloud} alt=""/>)
                        ;
                        setTimeout(() => {
                            this.setState({
                                image_component: image_component,
                                loadingImage: load_image,
                                printingmessage:"Upload completed. Try Another One",
                                printButtonDisabled:false
                            });}, 1500);
                    }

            });
        }else{
            alert("Please choose a file first");
        }
    };


    handleFile = async event => {
        let reader = new FileReader();
        let me = this;
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = function () {
            let fileContent = reader.result;
            me.setState({
                file: fileContent,
            })
        };
        let filepreview = [];
        filepreview.push(
            <MuiThemeProvider>
                <ListItem>
                    {event.target.files[0].name}
                </ListItem>
                <RaisedButton disabled={this.state.printButtonDisabled} label="Upload" primary={true} style={style} onClick={this.handleUpload}/>
            </MuiThemeProvider>
        )

        this.setState({
            filepreview: filepreview,
            data: event.target.files[0].name,
            date: event.target.files[0].lastModifiedDate,
        });
    };

    handleDivClick(event){
        // console.log("event",event);
        if(this.state.draweropen){
            this.setState({draweropen: false})
        }
    }

    render() {
            return(
                <div className="Uploadscreen">
                    <br/><br/><br/>
                    <div onClick={(event) => this.handleDivClick(event)}>
                        <MuiThemeProvider>
                            <Input type="file" color={blue500} name="Upload Image" onChange={this.handleFile} />
                            <br/><br/>
                            {this.state.image_component}
                        </MuiThemeProvider>
                    </div>
                    <div>
                        {this.state.filepreview}
                    </div>
                    <div>
                        {this.state.printingmessage}
                    </div>
                    <div>
                        {this.state.loadingImage}
                    </div>
                </div>
            )
    }

}

const style = {
    margin: 15,
};

export default Uploadscreen;