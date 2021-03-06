import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import {blue500} from "material-ui/styles/colors";
import Uploadpage from './uploadpage';
import LoginScreen from './loginscreen';
import CurrentLocation from './currentlocation';

export class MapContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            draweropen: false,
            currentScreen: [],
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        }
    }

    toggleDrawer(){
        console.log("this has been clicked");
        this.setState({draweropen: !this.state.draweropen})
    }

    handleMenuClick(event, page){
        switch(page){
            case "openprint":
                let currentScreen=[];
                currentScreen.push(<Uploadpage appContext={this.props.appContext}/>);
                this.props.appContext.setState({loginPage:[],uploadScreen:currentScreen,mapScreen:[]});
                break;
            case "openmaps":
                let mapsPage=[];
                mapsPage.push(<MapContainer appContext={this.props.appContext}/>);
                this.setState({mapsPage});
                break;
            case "logout":
                let loginPage =[];
                loginPage.push(<LoginScreen appContext={this.props.appContext}/>);
                this.props.appContext.setState({loginPage:loginPage,uploadScreen:[],mapScreen:[]});
                break;
            default:
                this.setState({draweropen: false})
        }
    }
    onMarkerClick = (props, marker, e) =>{
                    this.setState({
                        selectedPlace: props,
                        activeMarker: marker,
                        showingInfoWindow: true
                    });
                };

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false
            });
        }
    };
    render() {
        return (
            <div className="Mapcontainer">
                <MuiThemeProvider>
                    <AppBar
                        title="Map Support"
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
                        <MenuItem onClick={(event) => this.handleMenuClick(event, "openmaps")}>
                            Maps Page
                        </MenuItem>
                        <MenuItem onClick={(event) => this.handleMenuClick(event,"logout")}>
                            Logout
                        </MenuItem>
                    </Drawer>
                </MuiThemeProvider>
                <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
                    <Marker onClick={this.onMarkerClick} />
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
                    >
                        <div>
                            <h4>Location: Downtown, Toronto, ON</h4>
                            <h4>Latitude: 43.647885</h4>
                            <h4>Longitude: -79.369067</h4>
                        </div>
                    </InfoWindow>
                </CurrentLocation>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBa5ccoNgMP2dUTQOTMuXOnkuxPRc4jjCU'
})(MapContainer);