import React from 'react';

import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Map from '../src/Map';

const marker=[{latLng:{lat: 37.759703, lng: -122.428093}}];

describe('Map', () => {
  let map = null;
  let sandbox;
  let LatLng = null;
  let location;
  let google = global.google;


  it('handles returned markers', () => {
console.log('testing');
    const handleReturnedMarkers = sinon.stub();
    const spy = sinon.spy();
    const wrapper = shallow(
      <Map
        apiKey='AIzaSyADYWSlC4yEedJ-5lvQb9UFOVaMMux54Zc'

        markers={marker}
        handleReturnedMarkers={handleReturnedMarkers} />
      );
      wrapper.simulate('handleReturnedMarkers');
      // console.log(handleReturnedMarkers.toString());
      // sandbox = sinon.sandbox.create();
      // // sandbox.stub(, 'Map').returns(google.maps.Map);
      //
      // sinon.assert.calledOnce(handleReturnedMarkers);
      console.log(handleReturnedMarkers.firstCall.args);
      console.log(spy);
      console.log(handleReturnedMarkers('hello'));
      console.log(handleReturnedMarkers.firstCall.args);

    });

  });
