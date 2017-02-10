'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _pointInPolygon = require('point-in-polygon');

var _pointInPolygon2 = _interopRequireDefault(_pointInPolygon);

var markersArray = [];
var bounds = undefined;
var drawingManager = undefined;

var Map = (function (_React$Component) {
  _inherits(Map, _React$Component);

  function Map() {
    _classCallCheck(this, Map);

    _get(Object.getPrototypeOf(Map.prototype), 'constructor', this).call(this);
    this.state = {
      drawMode: false,
      loaded: false
    };
  }

  _createClass(Map, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.google !== this.props.google) {
        this.loadMap();
        if (this.props.drawMode) {
          this.drawPolyline();
        }
        if (this.props.insertMarker) {
          this.insertMarker();
        }
        if (this.props.heatMap) {
          this.heatMap();
        }
      }
      if (prevProps.markers.length !== this.props.markers.length && this.markers != prevProps.markers && this.state.loaded && !this.props.heatMap) {
        this.getMarkers();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var google = this.props.google;
      if (drawingManager && nextProps.drawMode != this.props.drawMode) {
        drawingManager.setDrawingMode(null);
      }
      if (this.props.drawMode !== nextProps.drawMode && nextProps.drawMode && this.props.google) {
        this.drawPolyline();
      }
    }
  }, {
    key: 'heatMap',
    value: function heatMap() {
      var google = this.props.google;

      var maps = google.maps;
      console.log(this.props.markers);
      var points = this.props.markers.map(function (point) {
        return new google.maps.LatLng(point.latLng.lat, point.latLng.lng);
      });

      var heatmap = new maps.visualization.HeatmapLayer({
        data: points,
        map: this.map
      });
    }
  }, {
    key: 'insertMarker',
    value: function insertMarker() {
      var google = this.props.google;

      var maps = google.maps;

      google.maps.event.addListener(this.map, 'click', (function (e) {
        var _this = this;

        var markerProps = {
          position: new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()),
          map: this.map,
          draggable: true
        };
        var marker = new maps.Marker(markerProps);

        this.props.handleReturnedMarkers({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        marker.addListener('dragend', function (e) {
          _this.props.handleReturnedMarkers({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        });
      }).bind(this));
    }
  }, {
    key: 'drawPolyline',
    value: function drawPolyline() {
      var google = this.props.google;

      drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: false,
        polygonOptions: this.props.polygonOptions
      });
      drawingManager.setMap(this.map);
      //======================================================
      // Event listeners after Polygon closed
      //======================================================
      google.maps.event.addListener(drawingManager, 'polygoncomplete', (function (polyline) {
        var _this2 = this;

        drawingManager.setDrawingMode(null);
        var resizablePolygon = polyline.getPath();
        //======================================================
        // Delete Polygon on click
        //======================================================
        google.maps.event.addListener(polyline, 'click', function (e) {
          polyline.setMap(null);
          resizablePolygon = [];
          _this2.getMarkers();
          _this2.drawPolyline();
        });
        //======================================================
        // Filtering function
        //======================================================
        var filterMarkers = function filterMarkers() {
          var polygon = [];
          var insideMarkers = [];

          resizablePolygon.forEach(function (coord) {
            polygon.push([coord.lat(), coord.lng()]);
          });
          markersArray.forEach(function (marker) {
            var x = marker.getPosition().lat();
            var y = marker.getPosition().lng();
            if (!(0, _pointInPolygon2['default'])([x, y], polygon)) {
              marker.setMap(null);
            } else {
              insideMarkers.push(marker);
              if (!marker.map) {
                marker.setMap(_this2.map);
              }
            }
          });
          if (_this2.props.handleReturnedMarkers) {
            _this2.props.handleReturnedMarkers(insideMarkers);
          }
        };
        filterMarkers();
        //======================================================
        // Resize polygon
        //======================================================
        google.maps.event.addListener(resizablePolygon, 'set_at', function (edge) {
          resizablePolygon = polyline.getPath();
          filterMarkers();
        });
        google.maps.event.addListener(resizablePolygon, 'insert_at', function (edge) {
          resizablePolygon = polyline.getPath();
          filterMarkers();
        });
      }).bind(this));
    }

    //======================================================
    // DISPLAY MARKERS IN MAP
    //======================================================
  }, {
    key: 'getMarkers',
    value: function getMarkers() {
      var _this3 = this;

      console.log('getMarkers');
      var google = this.props.google;

      var maps = google.maps;
      markersArray.forEach(function (marker) {
        marker.setMap(null);
      });
      markersArray = [];

      this.props.markers.forEach(function (flag) {
        var markerProps = _extends({}, flag, {
          position: new google.maps.LatLng(flag.latLng.lat, flag.latLng.lng),
          map: _this3.map
        });

        var marker = new maps.Marker(markerProps);

        if (_this3.props.onMarkerClick) {
          google.maps.event.addListener(marker, 'click', function (event) {
            _this3.props.onMarkerClick(marker);
          });
        }
        //======================================================
        // Render info window if we have an info property
        //======================================================
        if (marker.info) {
          (function () {
            var infowindow = new google.maps.InfoWindow({
              content: marker.info
            });
            google.maps.event.addListener(marker, 'click', function (event) {
              infowindow.open(_this3.map, marker);
            });
          })();
        }
        markersArray.push(marker);
        if (_this3.props.handleReturnedMarkers) {
          _this3.props.handleReturnedMarkers(markersArray);
        }
      });
    }
  }, {
    key: 'loadMap',
    value: function loadMap() {
      var _this4 = this;

      try {
        var google = this.props.google;

        var maps = google.maps;
        var mapRef = this.refs.map;
        var node = _reactDom2['default'].findDOMNode(mapRef);
        var mapConfig = this.props.mapConfig;
        var zoom = mapConfig.zoom;
        var lat = mapConfig.lat;
        var lng = mapConfig.lng;

        var center = new maps.LatLng(lat, lng);
        var mapConfiguration = _extends({}, {
          center: center,
          zoom: zoom
        });
        this.map = new maps.Map(node, mapConfiguration);
        google.maps.event.addListenerOnce(this.map, 'idle', function () {
          if (!_this4.props.heatMap) {
            _this4.getMarkers();
          }
        });
        this.setState({
          loaded: true
        });
      } catch (e) {
        console.log('error in load');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        {
          style: this.props.mapStyle,
          ref: 'map' },
        'Loading map...'
      );
    }
  }]);

  return Map;
})(_react2['default'].Component);

exports['default'] = Map;
module.exports = exports['default'];