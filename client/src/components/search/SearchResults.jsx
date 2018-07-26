import React from 'react';
import SearchResultsEntry from  './SearchResultsEntry.jsx'


var SearchResults = (props) => (

    <div>
      <h1>This will be the list of search results </h1>
      <ul>
        {props.searchResults.map((event, index) => {
          return (<SearchResultsEntry event={event} key={index} />)
        })}
      </ul>
    </div>
    )
  
  export default SearchResults;