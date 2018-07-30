import React from 'react';
import SearchResultsEntry from './SearchResultsEntry.jsx';

var SearchResults = props => (
  <div>
    <h3>Search Results </h3>
    <ul>
      {props.searchResults.map((event, index) => {
        return <SearchResultsEntry event={event} key={index} />;
      })}
    </ul>
  </div>
);

export default SearchResults;
