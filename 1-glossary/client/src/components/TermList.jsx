import React from 'react';
import TermListItem from './TermListItem.jsx';

const TermList = ({terms, deleteTerm, editTerm}) => {

  return (
    <div>
      {
        terms.map((term, i)=> {
          return <TermListItem key={i} term={term} deleteTerm={deleteTerm} editTerm={editTerm} />
        })
      }
    </div>
  )
}

export default TermList;