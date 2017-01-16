import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import isInside from 'point-in-polygon';


const markersArray=[];
let bounds;

class Map extends React.Component {
  constructor () {
    super();
    this.state = {
      drawMode:false,
    };
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevProps.google !== this.props.google) {
      this.loadMap();
      if (this.props.drawMode) {
        this.drawPolyline();
      }
      if (this.props.insertMarker) {
        this.insertMarker();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const google = this.props.google;
    if (this.props.drawMode !== nextProps.drawMode && nextProps.drawMode && this.props.google) {
      this.drawPolyline();
    }
  }
  insertMarker(){
    const {google} = this.props;
    const maps = google.maps;

    google.maps.event.addListener(this.map, 'click', function (e) {
      const markerProps=({
        position: new google.maps.LatLng(e.latLng.lat(),e.latLng.lng()),
        map: this.map,
        draggable:true
      })
      const marker = new maps.Marker(markerProps);

      this.props.handleReturnedMarkers({lat:e.latLng.lat(),lng:e.latLng.lng()});

      marker.addListener('dragend', (e)=>{
        this.props.handleReturnedMarkers({lat:e.latLng.lat(),lng:e.latLng.lng()});
      });

    }.bind(this));

  }

  drawPolyline(){
    const google = this.props.google;

    let drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: false,
      polygonOptions:this.props.polygonOptions
    });
    drawingManager.setMap(this.map);
    //======================================================
    // Event listeners after Polygon closed
    //======================================================
    google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polyline) {
      drawingManager.setDrawingMode(null);
      let resizablePolygon = polyline.getPath();
      //======================================================
      // Delete Polygon on click
      //======================================================
      google.maps.event.addListener(polyline, 'click',  (e) =>{
        polyline.setMap(null);
        resizablePolygon=[];
        this.getMarkers();
        this.drawPolyline();
      });
      //======================================================
      // Filtering function
      //======================================================
      const filterMarkers =()=>{
        let polygon=[];
        let insideMarkers=[];

        resizablePolygon.forEach(coord=>{
          polygon.push([coord.lat(),coord.lng()]);
        })
        markersArray.forEach(marker=>{
          const x = marker.getPosition().lat();
          const y = marker.getPosition().lng();
          if (!isInside([x,y],polygon)) {
            marker.setMap(null)
          } else {
            insideMarkers.push(marker);
            if (!marker.map) {
              marker.setMap(this.map)
            }
          }
        })
        if (this.props.handleReturnedMarkers) {
          this.props.handleReturnedMarkers(insideMarkers);
        }
      }
      filterMarkers();
      //======================================================
      // Resize polygon
      //======================================================
      google.maps.event.addListener(resizablePolygon, 'set_at', function (edge) {
        resizablePolygon=polyline.getPath();
        filterMarkers();
      });
      google.maps.event.addListener(resizablePolygon, 'insert_at', function (edge) {
        resizablePolygon=polyline.getPath();
        filterMarkers();
      });
    }.bind(this))
  }
  //======================================================
  // DISPLAY MARKERS IN MAP
  //======================================================
  getMarkers(){
    const {google} = this.props;
    const maps = google.maps;


    this.props.markers.forEach((flag)=>{
      const markerProps=({
        ...flag,
        position: new google.maps.LatLng(flag.latLng.lat,flag.latLng.lng),
        map: this.map
      })


      const marker = new maps.Marker(markerProps);

      if (this.props.onMarkerClick) {
        google.maps.event.addListener(marker,'click',(event)=>{
          this.props.onMarkerClick(marker);
        });
      }
      //======================================================
      // Render info window if we have an info property
      //======================================================
      if (marker.info) {
        const infowindow = new google.maps.InfoWindow({
          content: marker.info
        });
        google.maps.event.addListener(marker,'click',(event)=>{
          infowindow.open(this.map, marker);
        })
      }
      markersArray.push(marker);
      if (this.props.handleReturnedMarkers) {
        this.props.handleReturnedMarkers(markersArray);
      }
    })
  }

  loadMap(){
    // if (this.props && this.props.google) {
    // google is available
    const {google} = this.props;
    const maps = google.maps;

    const mapRef = this.refs.map;
    const node = ReactDOM.findDOMNode(mapRef);
    const {mapConfig}=this.props;
    let {zoom} = mapConfig;
    let {lat} = mapConfig;
    let {lng} = mapConfig;
    const center = new maps.LatLng(lat, lng);
    const mapConfiguration = Object.assign({}, {
      center: center,
      zoom: zoom
    })
    this.map = new maps.Map(node, mapConfiguration);
    google.maps.event.addListenerOnce(this.map, 'idle', ()=>{
      this.getMarkers();
    });

  }

  render() {

    return (
      <div
        style={this.props.mapStyle}
        ref='map'>
        Loading map...
      </div>
    )
  }
}


export default Map;
