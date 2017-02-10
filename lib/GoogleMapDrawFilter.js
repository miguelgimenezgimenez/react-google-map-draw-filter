'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

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