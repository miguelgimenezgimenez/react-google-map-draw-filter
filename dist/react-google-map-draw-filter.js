(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.GoogleMapDrawFilter = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function (point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var GoogleApi = function GoogleApi(opts) {
  opts = opts || {};

  var apiKey = opts.apiKey;
  var libraries = opts.libraries || [];
  var client = opts.client;
  var URL = 'https://maps.googleapis.com/maps/api/js';

  var googleVersion = '3.25';
  var script = null;
  var google = window.google = null;
  var loading = false;
  var channel = null;
  var language = null;
  var region = null;

  var onLoadEvents = [];

  var url = function url() {
    var url = URL;
    var params = {
      key: apiKey,
      callback: 'CALLBACK_NAME',
      libraries: libraries.join(','),
      client: client,
      v: googleVersion,
      channel: channel,
      language: language,
      region: region
    };

    var paramStr = Object.keys(params).filter(function (k) {
      return !!params[k];
    }).map(function (k) {
      return k + '=' + params[k];
    }).join('&');

    return url + '?' + paramStr;
  };

  return url();
};

exports.GoogleApi = GoogleApi;
exports['default'] = GoogleApi;

},{}],3:[function(require,module,exports){
(function (global){
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

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ScriptCache = require('./ScriptCache');

var _ScriptCache2 = _interopRequireDefault(_ScriptCache);

var _GoogleApi = require('./GoogleApi');

var _GoogleApi2 = _interopRequireDefault(_GoogleApi);

var defaultMapConfig = {};
var wrapper = function wrapper(WrappedComponent) {
  var Wrapper = (function (_React$Component) {
    _inherits(Wrapper, _React$Component);

    function Wrapper(props, context) {
      _classCallCheck(this, Wrapper);

      _get(Object.getPrototypeOf(Wrapper.prototype), 'constructor', this).call(this, props, context);

      this.state = {
        loaded: false,
        map: null,
        google: null
      };
    }

    _createClass(Wrapper, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this = this;

        var refs = this.refs;
        this.scriptCache.google.onLoad(function (err, tag) {

          var maps = window.google.maps;

          var props = _extends({}, _this.props, {
            loaded: _this.state.loaded
          });

          var mapRef = refs.map;

          var node = _reactDom2['default'].findDOMNode(mapRef);
          var center = new maps.LatLng(_this.props.lat, _this.props.lng);

          var mapConfig = _extends({}, defaultMapConfig, {
            center: center, zoom: _this.props.zoom
          });

          _this.map = new maps.Map(node, mapConfig);

          _this.setState({
            loaded: true,
            map: _this.map,
            google: window.google
          });
        });
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {

        this.scriptCache = (0, _ScriptCache2['default'])({
          google: (0, _GoogleApi2['default'])({
            apiKey: this.props.apiKey,
            libraries: ['drawing', 'visualization']
          })
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var props = _extends({}, this.props, {
          loaded: this.state.loaded,
          map: this.state.map,
          google: this.state.google,
          mapComponent: this.refs.map
        });
        return _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(WrappedComponent, props),
          _react2['default'].createElement('div', { ref: 'map' })
        );
      }
    }]);

    return Wrapper;
  })(_react2['default'].Component);

  return Wrapper;
};

exports.wrapper = wrapper;
exports['default'] = wrapper;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./GoogleApi":2,"./ScriptCache":4,"react-dom":undefined}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var counter = 0;
var scriptMap = new Map();

var ScriptCache = (function (global) {
  return function ScriptCache(scripts) {
    var Cache = {};

    Cache._onLoad = function (key) {
      return function (cb) {
        var stored = scriptMap.get(key);
        if (stored) {
          stored.promise.then(function () {
            stored.error ? cb(stored.error) : cb(null, stored);
          });
        } else {
          // TODO:
        }
      };
    };

    Cache._scriptTag = function (key, src) {
      var tag = document.createElement('script');
      var promise = new Promise(function (resolve, reject) {
        var resolved = false,
            errored = false,
            body = document.getElementsByTagName('body')[0];

        tag.type = 'text/javascript';
        tag.async = false; // Load in order

        var cbName = 'loaderCB' + counter++ + Date.now();
        var cb = undefined;

        var cleanup = function cleanup() {
          if (global[cbName] && typeof global[cbName] === 'function') {
            global[cbName] = null;
          }
        };
        var handleResult = function handleResult(state) {
          return function (evt) {
            var stored = scriptMap.get(key);
            if (state === 'loaded') {
              stored.resolved = true;
              resolve(src);
              // stored.handlers.forEach(h => h.call(null, stored))
              // stored.handlers = []
            } else if (state === 'error') {
                stored.errored = true;
                // stored.handlers.forEach(h => h.call(null, stored))
                // stored.handlers = [];
                reject(evt);
              }
            cleanup();
          };
        };

        tag.onload = handleResult('loaded');
        tag.onerror = handleResult('error');
        tag.onreadystatechange = function () {
          handleResult(tag.readyState);
        };

        // Pick off callback, if there is one
        if (src.match(/callback=CALLBACK_NAME/)) {
          src = src.replace(/(callback=)[^\&]+/, '$1' + cbName);
          cb = window[cbName] = tag.onload;
        } else {
          tag.addEventListener('load', tag.onload);
        }
        tag.addEventListener('error', tag.onerror);

        tag.src = src;
        body.appendChild(tag);
        return tag;
      });
      var initialState = {
        loaded: false,
        error: false,
        promise: promise,
        tag: tag
      };
      scriptMap.set(key, initialState);

      return scriptMap.get(key);
    };

    Object.keys(scripts).forEach(function (key) {
      var script = scripts[key];
      Cache[key] = {
        tag: Cache._scriptTag(key, script),
        onLoad: Cache._onLoad(key)
      };
    });

    return Cache;
  };
})(window);

exports.ScriptCache = ScriptCache;
exports['default'] = ScriptCache;

},{}],5:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _ApiComponentsScriptCache = require('./ApiComponents/ScriptCache');

var _ApiComponentsScriptCache2 = _interopRequireDefault(_ApiComponentsScriptCache);

var _ApiComponentsGoogleApi = require('./ApiComponents/GoogleApi');

var _ApiComponentsGoogleApi2 = _interopRequireDefault(_ApiComponentsGoogleApi);

var _ApiComponentsGoogleApiComponent = require('./ApiComponents/GoogleApiComponent');

var _ApiComponentsGoogleApiComponent2 = _interopRequireDefault(_ApiComponentsGoogleApiComponent);

var _Map = require('./Map');

var _Map2 = _interopRequireDefault(_Map);

var GoogleMapDrawFilter = (function (_React$Component) {
	_inherits(GoogleMapDrawFilter, _React$Component);

	function GoogleMapDrawFilter() {
		_classCallCheck(this, GoogleMapDrawFilter);

		_get(Object.getPrototypeOf(GoogleMapDrawFilter.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(GoogleMapDrawFilter, [{
		key: 'render',
		value: function render() {

			return _react2['default'].createElement(
				'div',
				null,
				_react2['default'].createElement(_Map2['default'], {
					google: this.props.google,
					heatMap: this.props.heatMap,
					drawMode: this.props.drawMode,
					markers: this.props.markers,
					mapConfig: this.props.mapConfig,
					mapStyle: this.props.mapStyle,
					polygonOptions: this.props.polygonOptions,
					handleReturnedMarkers: this.props.handleReturnedMarkers,
					onMarkerClick: this.props.onMarkerClick,
					insertMarker: this.props.insertMarker,
					apiKey: this.props.apiKey
				})
			);
		}
	}]);

	return GoogleMapDrawFilter;
})(_react2['default'].Component);

GoogleMapDrawFilter.propTypes = {
	apiKey: _react2['default'].PropTypes.string.isRequired,
	drawMode: _react2['default'].PropTypes.bool,
	heatMap: _react2['default'].PropTypes.bool,
	markers: _react2['default'].PropTypes.array,
	mapConfig: _react2['default'].PropTypes.object,
	polygonOptions: _react2['default'].PropTypes.object,
	google: _react2['default'].PropTypes.object, //is provided by wrapper
	mapStyle: _react2['default'].PropTypes.object,
	handleReturnedMarkers: _react2['default'].PropTypes.func,
	onMarkerClick: _react2['default'].PropTypes.func,
	insertMarker: _react2['default'].PropTypes.bool
};

GoogleMapDrawFilter.defaultProps = {
	drawMode: true,
	insertMarker: false,
	mapConfig: {
		zoom: 14,
		lat: 41.384279176844764,
		lng: 2.1526336669921875

	},
	mapStyle: {
		height: '600px',
		width: '600px'
	},
	polygonOptions: {
		fillColor: '#455A64',
		fillOpacity: 0.3,
		strokeColor: '#455A64',
		strokeWeight: 3,
		clickable: true,
		editable: true,
		zIndex: 1
	},
	markers: []
};

exports['default'] = (0, _ApiComponentsGoogleApiComponent2['default'])(GoogleMapDrawFilter);
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./ApiComponents/GoogleApi":2,"./ApiComponents/GoogleApiComponent":3,"./ApiComponents/ScriptCache":4,"./Map":6}],6:[function(require,module,exports){
(function (global){
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

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"point-in-polygon":1,"react-dom":undefined}]},{},[5])(5)
});