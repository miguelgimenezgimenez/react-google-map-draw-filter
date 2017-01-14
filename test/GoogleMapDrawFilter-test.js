import React from 'react';

import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import GoogleMapDrawFilter from '../src/GoogleMapDrawFilter';

describe('GoogleMapDrawFilter', () => {
  let wrapper;

  describe('google prop', () => {
    it('should require an `apiKey` prop', () => {
      expect(() => mount(<GoogleMapDrawFilter />)).to.throw(Error);
    });

    it('does not explode with a `google` prop', () => {
      expect(() => mount(
        <GoogleMapDrawFilter
          apiKey='AIzaSyADYWSlC4yEedJ-5lvQb9UFOVaMMux54Zc'
         />
      )).not.to.throw(Error);
    });
  });

});
