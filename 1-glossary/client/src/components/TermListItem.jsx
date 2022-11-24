import React, { useState } from 'react';

const TermListItem = ({term, deleteTerm, editTerm}) => {
  const [editMode, setEditMode] = useState(false);

  const [newTerm, setNewTerm] = useState('');
  const [newDefinition, setNewDefinition] = useState('');

  const clickEdit = () => {
    if (editMode) {
      editTerm(term.term, newTerm, newDefinition);
      setNewTerm('');
      setNewDefinition('');
    } else {
      setNewTerm(term.term);
      setNewDefinition(term.definition);
    }
    setEditMode(!editMode);
  }

  return (
    <div className='term'>
      { 
        !editMode ? 
        <div className='term-text'>{term.term + ': ' + term.definition}</div> : 
        <span>
          <input value={newTerm} onChange={ (e) => { setNewTerm(e.target.value) } } type="text" />
          <span> : </span>
          <input value={newDefinition} onChange={ (e) => { setNewDefinition(e.target.value) } } type="text" />
        </span>
      }
      <button className='edit-button' onClick={ clickEdit }>{ editMode ? 'Submit' : 'Edit' }</button>
      <button className='delete-button' onClick={() => { deleteTerm(term.term) } }>Delete</button>
    </div>
  )
}

export default TermListItem;