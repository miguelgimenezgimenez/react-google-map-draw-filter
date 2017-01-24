require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactGoogleMapDrawFilter = require('react-google-map-draw-filter');

var _reactGoogleMapDrawFilter2 = _interopRequireDefault(_reactGoogleMapDrawFilter);

var App = (function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    _get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this);
    this.state = {
      drawMode: false,
      activeMarkers: []
    };
  }

  _createClass(App, [{
    key: 'onMarkerClick',
    value: function onMarkerClick(marker, e) {
      this.setState({
        activeMarkers: [marker]
      });
    }
  }, {
    key: 'renderMarkerInfo',
    value: function renderMarkerInfo() {
      if (this.state.activeMarkers) {
        return this.state.activeMarkers.map(function (marker, i) {
          return _react2['default'].createElement(
            'div',
            { key: 'marker' + i },
            marker.label,
            marker.info
          );
        });
      }
    }
  }, {
    key: 'handleReturnedMarkers',
    value: function handleReturnedMarkers(markers) {
      this.setState({
        activeMarkers: markers
      });
    }
  }, {
    key: 'toggleDraw',
    value: function toggleDraw() {
      this.setState({
        drawMode: !this.state.drawMode
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var markers = [{
        info: '- Marker1',
        label: 'A',
        title: 'hello',
        latLng: { lng: 2.13815342634916, lat: 41.39485570794 }
      }, {
        label: 'B',
        info: '- Marker2',
        latLng: { lng: 2.1575260162353516, lat: 41.39586980544921 }
      }, {
        label: 'C',
        info: '- Marker 3',
        latLng: { lng: 2.162332534790039, lat: 41.397801375978204 }
      }, {
        label: 'D',
        info: '- Marker 4',
        latLng: { lng: 2.154865264892578, lat: 41.38576031676253 }
      }, {
        label: 'E',
        info: '- Marker 5',
        latLng: { lng: 2.14205645751953, lat: 41.38344199588044 }
      }];

      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'button',
          { onClick: this.toggleDraw.bind(this) },
          'toggleDraw'
        ),
        _react2['default'].createElement(
          'div',
          { className: 'App' },
          _react2['default'].createElement(_reactGoogleMapDrawFilter2['default'], {
            drawMode: this.state.drawMode,
            markers: markers,
            handleReturnedMarkers: this.handleReturnedMarkers.bind(this),
            onMarkerClick: this.onMarkerClick.bind(this),
            apiKey: 'AIzaSyADYWSlC4yEedJ-5lvQb9UFOVaMMux54Zc'
          })
        ),
        _react2['default'].createElement(
          'h1',
          null,
          this.renderMarkerInfo.bind(this)()
        )
      );
    }
  }]);

  return App;
})(_react.Component);

_reactDom2['default'].render(_react2['default'].createElement(App, null), document.getElementById('app'));

},{"react":undefined,"react-dom":undefined,"react-google-map-draw-filter":undefined}]},{},[1]);
