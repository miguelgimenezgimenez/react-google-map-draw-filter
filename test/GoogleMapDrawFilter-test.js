import React from 'react';

import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import GoogleMapDrawFilter from '../src/GoogleMapDrawFilter';



describe('GoogleMapDrawFilter', () => {
  let map = null;
  let sandbox;
  let LatLng = null;
  let location;
  let google = global.google;

  beforeEach(() => {
    console.log(google);
    sandbox = sinon.sandbox.create();

    map = {};
    location = {lat: 37.759703, lng: -122.428093};

    // sandbox.stub(google.maps, 'Map').returns(google.maps.Map);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('accepts a `map` and a `google` prop', () => {
    expect(true).toBe(true);
  });

});
