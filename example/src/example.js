import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import GoogleMapDrawFilter from 'react-google-map-draw-filter';

class App extends Component {
  constructor () {
    super();
    this.state = {
      drawMode:false,
      activeMarkers: [],
    };
  }
  onMarkerClick(marker,e){
    this.setState({
      activeMarkers : [marker]
    });
  }
  renderMarkerInfo() {
		if (this.state.activeMarkers) {
			return this.state.activeMarkers.map((marker,i)=>(
				<div key={`marker${i}`}>
					{marker.label}
					{marker.info}
				</div>)
			)
		}
	}


  handleReturnedMarkers(markers) {
    this.setState({
      activeMarkers: markers
    });
  }
  toggleDraw(){
    this.setState({
      drawMode:!this.state.drawMode ,
    });
  }

  render() {
    const markers = [
  			{
  				info:'beer garden',
  				title:'hello',
  				latLng:{lng:2.13815342634916,lat:41.39485570794}
  			},

  			{
  				info:'dance class',
  				latLng:{lng:2.1575260162353516,lat: 41.39586980544921}
  			},

  			{
  				info:'dance class',
  				latLng:{lng:2.162332534790039 ,lat:41.397801375978204}
  			},

  			{
  				info:'dance class',
  				latLng:{lng:2.154865264892578 ,lat:41.38576031676253}
  			},

  			{
  				info:'lesbian party',
  				latLng:{lng:2.142505645751953 ,lat:41.38344199588044}
  			},
  			{
  				info:' party',
  				latLng:
  				{lng:2.1316909790039062,lat: 41.40044109620138}
  			},
  			{
  				info:' party',
  				latLng:
  				{lng:2.130146026611328 ,lat:41.40308070920773}
  			},
  			{
  				info:' party',
  				latLng:
  				{lng:2.1413040161132812,lat: 41.40346698504464}
  			},
  		];



      return (<div>
        <button onClick={this.toggleDraw.bind(this)}>toggleDraw</button>
        <div className="App">
          <div className="App-header">

            <h2>Welcome to React</h2>
          </div>
          <GoogleMapDrawFilter
            drawMode={this.state.drawMode}
            markers={markers}
            apiKey='AIzaSyADYWSlC4yEedJ-5lvQb9UFOVaMMux54Zc'
            handleReturnedMarkers={this.handleReturnedMarkers.bind(this)}
            onMarkerClick={this.onMarkerClick.bind(this)}
          />
        </div>
        <h1>{this.renderMarkerInfo.bind(this)()}</h1>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
