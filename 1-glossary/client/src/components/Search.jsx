import React, { useState } from 'react';

const Search = ({searchTerm}) => {

  return (
    <div className='term-input'>
      <span>  Search:   </span>
      <input className='form-field' placeholder='term' type="text" onChange={ (e) => {searchTerm(e.target.value)} }/>
    </div>
  )
}

export default Search;