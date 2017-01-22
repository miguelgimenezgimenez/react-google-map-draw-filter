# Google Map Polygon Filter

React component that includes a google map which allows the possibility to draw a draggable polygon that filters the markers within its area.

Also allows the possibility to insert draggable markers and return its coordinates.

WIP comments and feedback are welcome




## Demo & Examples

![effect showcase](http://i.imgur.com/WMm7sMS.gif)



Live demo: [miguelgimenezgimenez.github.io/react-google-map-draw-filter](http://miguelgimenezgimenez.github.io/react-google-map-draw-filter/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use react-google-map-draw-filter is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-google-map-draw-filter.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-google-map-draw-filter --save
```


## Usage



``` js
const markers = [{info:' Marker1',icon:'image/icon.jpg', label:'A',
latLng:{lng:2.13815342634916,lat:41.39485570794}},
{info:' Marker2', label:'B',latLng:{lng:2.13815342634926,lat:41.39485570795}}];

import GoogleMapDrawFilter from "react-google-map-draw-filter";


<GoogleMapDrawFilter
   apiKey='AIzaSyADYWSlC4yEedJ-5lvQb9UFOVaMMux54Zc'
   drawMode={true} //boolean that toggles draw mode (optional)
   markers={markers} //Require latLng key with lat and lng properties
   handleReturnedMarkers={this.handleReturnedMarkers.bind(this)} //Callback
   //fired when polygon is closed with the markers within the polygon as first argument
			/>								

```



### The main props are :

 * **apiKey  (REQUIRED)** :

api key provided by google.

 * **markers** :

An array of objects that has to have a [`latLng`] property with [`lat`] and  [`lng`] properties like so [`latLng:{lng:2,lat:41.}}`], this markers will be returned by the callback handleReturned markers when rendered in the map, clicked on or selected within the triangle.
the info prop will be the flag shown when the marker is clicked. You can also add a "label" prop which will be rendered inside the marker.

* **handleReturnedMarkers** :

callback fired when the polygon is closed returning the markers within the polygon, also when the polygon is resized, with the selected markers as only argument of the callback.

 * **onMarkerClick** :

callback fired when marker is clicked.Also has the marker as only argument of the callback.

* **drawMode** :

Boolean that to can be used to turn on the draw mode. By default is ON.

 * **insertMarker**:

Boolean to insert a marker in the map. If set to on a draggable marker will be rendered in the map wherever you click. the callback handleReturnedMarkers is fired when set and dragged on the map.



#### IF WE WANT TO INSERT A MARKER AND GET ITS COORDINATES WE HAVE TO PASS A PROP CALLED INSERT MARKER AND SET IT AS TRUE :


``` js
  <GoogleMapDrawFilter
     apiKey='AIzaSyADYWSlC4yEedJ-5lvQb9UFOVaMMux54Zc'
     mapStyle={{height:400,width:800}}
     drawMode={false}
     insertMarker={true}
     handleReturnedMarkers={this.handleReturnedMarkers.bind(this)}
              />
```

More examples here https://github.com/miguelgimenezgimenez/reactGoogleMapSampleProject


### PropTypes


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
	insertMarker:React.PropTypes.bool,
	onMarkerClick:React.PropTypes.func,


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


## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

MIT

Copyright (c) 2017 Miguel Gimenez.
