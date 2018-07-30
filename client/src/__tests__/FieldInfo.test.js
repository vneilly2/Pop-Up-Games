import FieldInfo from '../components/field/FieldInfo.jsx';
import {shallow} from 'enzyme';
import React from 'react';

describe('FieldInfo', () => {
    it('should render all parts', () => {
      const props = {data: {'fieldName': 'Grass Field 1', 'notes': 'nice grass here'}}
      const wrapper = shallow(<FieldInfo {...props}/>);
      expect(wrapper.find('h1').exists()).toBe(true);
      expect(wrapper.find('h1').text()).toBe('Upcoming Events at Grass Field 1')
      expect(wrapper.find('h6').exists()).toBe(true);
      expect(wrapper.find('h6').text()).toBe('Notes: nice grass here')
    });
    
  });