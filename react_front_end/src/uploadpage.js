import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import {blue500} from 'material-ui/styles/colors';
import UploadScreen from './uploadscreen';
import LoginScreen from './loginscreen'


class UploadPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            draweropen: false,
            currentScreen: []
        }
    }
    toggleDrawer(){
        console.log("this has been clicked");
        this.setState({draweropen: !this.state.draweropen})
    }

    componentDidMount(){
        let currentScreen=[];
        currentScreen.push(<UploadScreen appContext={this.props.appContext}/>);
        this.setState({currentScreen})
    }

    handleMenuClick(event, page){
        switch(page){
            case "openprint":
                let currentScreen=[];
                currentScreen.push(<UploadScreen appContext={this.props.appContext}/>);
                this.setState({currentScreen});
                break;
            case "logout":
                let loginPage =[];
                loginPage.push(<LoginScreen appContext={this.props.appContext}/>);
                this.props.appContext.setState({loginPage:loginPage,uploadScreen:[]});
                break;
            default:
                this.setState({draweropen: false})
        }
    }
    render(){
            return(
                <div className="UploadPage">
                    <MuiThemeProvider>
                        <AppBar
                            title="Upload Screen"
                            onLeftIconButtonClick={() => this.toggleDrawer()}
                        />
                    </MuiThemeProvider>
                    <MuiThemeProvider>
                        <Drawer open={this.state.draweropen}>
                            <MenuItem>
                                <FontIcon
                                    className="material-icons drawerclosebutton"
                                    color={blue500}
                                    styles={{ top:10,}}
                                    onClick={(event) => this.toggleDrawer(event)}
                                >
                                    clear
                                </FontIcon>
                            </MenuItem>
                            <MenuItem onClick={(event) => this.handleMenuClick(event,"openprint")}>
                                Upload Page
                            </MenuItem>
                            <MenuItem onClick={(event) => this.handleMenuClick(event,"logout")}>
                                Logout
                            </MenuItem>
                        </Drawer>
                    </MuiThemeProvider>
                    <div>
                        {this.state.currentScreen}
                    </div>
                </div>
            );
    }
}

export default UploadPage;