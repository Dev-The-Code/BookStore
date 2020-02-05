import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
    render() {
        const style = {
            width: '80%',
            height: '50%'
        }

        return (
            <Map
                google={this.props.google}
                style={style}
                zoom={14}>


                <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose}>
                    {/*<div>*/}
                        {/*<h1>{this.state.selectedPlace.name}</h1>*/}
                    {/*</div>*/}
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyCXohTEHSIMFa6teSxmlnaxZkj33K6VQB4')
})(MapContainer)