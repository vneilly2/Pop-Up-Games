import VenueEntry from '../components/home/VenueEntry.jsx';
import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

describe('Venue Entry component', () => {
  it('VenueEntry: renders correctly', () => {
    const props = { venue: { name: 'testvenue' }, changeTarget: jest.fn() };
    const tree = renderer
      .create(
        <Router>
          <VenueEntry {...props} />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
