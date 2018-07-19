import React from 'react';
import { mount } from 'enzyme';
import { CreateEvent } from '../components/createevent/CreateEvent';

describe('Does Hello World Show up', () => {
  it('should cotain a div with hello world in it', () => {
    const w = mount(<CreateEvent />);
    expect(w.text()).toEqual('Hello World');
  });
});