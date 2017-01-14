var React = require('react');
var ReactDOM = require('react-dom');
var GoogleMapDrawFilter = require('react-google-map-draw-filter');

var App = React.createClass({
	render () {
		return (
			<div>
				<GoogleMapDrawFilter />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
