import React, { useState } from 'react';

const Form = ({term, addTerm}) => {

  const [termText, setTermText] = useState('');
  const [defText, setDefText] = useState('');

  const _addTerm = (t, d) => {
    addTerm(t, d);
    setTermText('');
    setDefText('');
  }

  return (
    <div className='term-input'>
      <input className='form-field' placeholder='term' type="text" value={termText} onChange={ (e) => {setTermText(e.target.value)} }/>
      <input className='form-field'  placeholder='definition' type="text" value={defText} onChange={ (e) => {setDefText(e.target.value)} } />
      <button className='add-button' onClick={ () => _addTerm(termText, defText) }>Add</button>
    </div>
  )
}

export default Form;