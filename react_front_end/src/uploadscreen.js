import React, { Component } from 'react';
import './App.css';
import Loginscreen from './loginscreen';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
//import FontIcon from 'material-ui/FontIcon';
//import {blue500} from 'material-ui/styles/colors';

import fetch from 'node-fetch';

const api_base_url= "http://localhost:8888/reports";
const converter_api = "https://api2.online-convert.com";
const api_key = "046dc7982b5c86ad78ac55cf76e0f31d";

class Uploadscreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            longitude: 'someval',
            latitude: 'someval',
            data: 'someval',
            location: 'someval',
            datatype: 'image',
            selectedFile: null,
            loaded: 0,
            draweropen:false,
            printcount:10,
            printingmessage:'',
            printButtonDisabled:false
        }
    }

    handleUpload = async function (my_data){
        //console.log(my_data);
        /*
        let converter_url = converter_api+'/jobs';
        await fetch(converter_url,
            {
                method: 'POST',
                headers: {
                    "X-Oc-Api-Key": api_key,
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": '*'
                },
                body: JSON.stringify({
                        input: [{
                            type: "remote",
                            source: my_data[0].name,
                        }],
                        conversion: [{
                            target: "svg"
                        }]
                    }
                )
            })
            .then(async data => {
                let api_url = api_base_url+'/create_raw_report'
                console.log(data["output"]);
                await fetch(api_url,
                    {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": '*'
                        },
                        body: JSON.stringify({
                                image: data["output"],
                                tweet: null,
                                longitude: this.state.longitude,
                                latitude: this.state.latitude,
                                data: this.state.data,
                                datatype: this.state.datatype,
                                location: this.state.location,
                            }
                        )
                    }).then(my_response =>{
                    console.log(my_response);
                })
            })
            */
    };


    handleFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    };

    handleDivClick(event){
        // console.log("event",event);
        if(this.state.draweropen){
            this.setState({draweropen:false})
        }
    }

    handleLogout(event){
        // console.log("logout event fired",this.props);
        let loginPage =[];
        loginPage.push(<Loginscreen appContext={this.props.appContext}/>);
        this.props.appContext.setState({loginPage:loginPage,uploadScreen:[]})
    }

    render() {
            return(
                <div className="Uploadscreen">
                    <div onClick={(event) => this.handleDivClick(event)}>
                        <div>
                            You can upload upto {this.state.printcount} files
                        </div>

                        <div>
                            <input type="file" name="" id="" onChange={this.handleFile} />
                            <MuiThemeProvider>
                                <RaisedButton disabled={this.state.printButtonDisabled} label="Upload" primary={true} style={style} onClick={this.handleUpload}/>
                            </MuiThemeProvider>
                            <div> {this.state.loaded} %</div>
                        </div>
                        <div>
                            {this.state.printingmessage}
                        </div>

                    </div>
                </div>
            )
    }

}

const style = {
    margin: 15,
};

export default Uploadscreen;