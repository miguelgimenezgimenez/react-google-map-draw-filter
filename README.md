# GoogleMap Draw Polygon Filter

React component that includes a google map which allows the possibility to draw a draggable polygon and output and filter the markers within the polygon.

Also allow the possibility to insert markers and output return their coordinates.


THIS IS JUST A TEST VERSION VERSION,API KEY IS PROVIDED, TO GIVE YOUR OWN API KEY INSERT IT IN THE "GoogleApi.js" component, WHICH IS IN THE "GoogleApi" FOLDER.

## Demo & Examples

Live demo: [miguelgimenezgimenez.github.io/react-google-map-draw-filter](http://miguelgimenezgimenez.github.io/react-google-map-draw-filter/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use react-gmap-filter is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-gmap-filter.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-google-map-draw-filter --save
```


## Usage


``` js
const markers = [
  			{
  				info:'- Marker1',
          label:'A',
  				title:'hello',
  				latLng:{lng:2.13815342634916,lat:41.39485570794}
  			},

  			{
          label:'B',
  				info:'- Marker2',
  				latLng:{lng:2.1575260162353516,lat: 41.39586980544921}
  			},

  			{
          label:'C',
  				info:'- Marker 3',
  				latLng:{lng:2.162332534790039 ,lat:41.397801375978204}
  			},

  			       

  		];

import GoogleMap from "react-google-map-draw-filter";
<GoogleMap
					drawMode={true} //boolean that toggles draw mode (optional)
					markers={markers} // array of objects containing a latLng property with lat and lng properties	
					handleReturnedMarkers={this.handleReturnedMarkers.bind(this)} //Callback fired when polygon is closed with the markers within the polygon as first argument
				/>
```

### Properties


the markers prop is an array of object containining a latLng object with lat and lng properties and any properties you want to provide which will be returned after the polygon filter.

You can provide polygon , and Marker options the same way you would in google maps, 
the mapStyle takes widtht and height property for the map, set to 600px by default 
``` js

GoogleMap.propTypes={
	apiKey:React.PropTypes.string.isRequired,
	drawMode:React.PropTypes.bool,
	markers:React.PropTypes.array,
	mapConfig:React.PropTypes.object,
	polygonOptions:React.PropTypes.object,
	google:React.PropTypes.object, //is provided by wrapper
	mapStyle:React.PropTypes.object,
	handleReturnedMarkers:React.PropTypes.func,
	insertMarker={this.props.insertMarker}

}
GoogleMap.defaultProps={
	drawMode:true,
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
}

```
### Examples





## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

__PUT LICENSE HERE__

Copyright (c) 2017 Miguel Gimenez.

