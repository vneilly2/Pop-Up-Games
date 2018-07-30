import Field from '../components/field/Field.jsx';
import {shallow} from 'enzyme';
import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'
import renderer from 'react-test-renderer';

describe('Field component', () => {

	it ('Field: renders correctly', () => {
		const props = {target: {field:1}, changeTarget: jest.fn() }
		const tree = renderer.create(<Field {...props}/>).toJSON();
		expect (tree).toMatchSnapshot();
	})
	
})



//issues with testing axios functions because they are dependent on state

// it ('returns field data when getFieldData is called', done => {
// 	const wrapper = shallow(<Field/>);
// 	const instance = wrapper.instance()
// 	const mock = new MockAdapter(axios);
// 	const mockData = {field: {id:1, fieldName: 'Grass Field1'}}
// 	mock.onGet('/api/field', {params: {id: 1}}).reply(200,mockData)

// 	var contextObj = {state: {fieldId:1}}
// 	Field.prototype.getFieldData().then(response => {
// 		expect(response.data).toEqual(mockData);
// 		done();
// 	});
	
// })
