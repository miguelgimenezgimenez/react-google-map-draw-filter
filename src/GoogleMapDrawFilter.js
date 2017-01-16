import React, { Component } from 'react'

import cache from './ApiComponents/ScriptCache';
import GoogleApi from './ApiComponents/GoogleApi';
import GoogleApiComponent from './ApiComponents/GoogleApiComponent';
import Map from './Map';


let ApiKey;


class GoogleMapDrawFilter extends React.Component {


	render () {

		return (
			<div >
				<Map
					google={this.props.google}
					drawMode={this.props.drawMode}
					markers={this.props.markers}
					mapConfig={this.props.mapConfig}
					mapStyle={this.props.mapStyle}
					polygonOptions={this.props.polygonOptions}
					handleReturnedMarkers={this.props.handleReturnedMarkers}
					onMarkerClick={this.props.onMarkerClick}
					insertMarker={this.props.insertMarker}
				/>

			</div>
		);
	}
}



GoogleMapDrawFilter.propTypes={
	drawMode:React.PropTypes.bool,
	markers:React.PropTypes.array,
	mapConfig:React.PropTypes.object,
	polygonOptions:React.PropTypes.object,
	google:React.PropTypes.object, //is provided by wrapper
	mapStyle:React.PropTypes.object,
	handleReturnedMarkers:React.PropTypes.func,
	onMarkerClick:React.PropTypes.func,
	insertMarker:React.PropTypes.bool
};

GoogleMapDrawFilter.defaultProps={
	drawMode:true,
	insertMarker:false,
	mapConfig:{
		zoom:14,
		lat:41.384279176844764,
		lng:2.1526336669921875,

	},
	mapStyle:{
		height:'600px',
		width: '600px',
	},
	polygonOptions:{
		fillColor: '#455A64',
		fillOpacity: 0.3,
		strokeColor:'#455A64',
		strokeWeight:3,
		clickable: true,
		editable: true,
		zIndex: 1
	},
	markers:[],
};



export default GoogleApiComponent({
	apiKey: ApiKey
})(GoogleMapDrawFilter);
