import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TermList from './TermList.jsx';
import Form from './Form.jsx';
import Search from './Search.jsx';

const App = () => {

  // state
  const [terms, setTerms] = useState([]);
  const [visTerms, setVisTerms] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    updateVisTerms();
  }, [terms])

  useEffect(() => {
    updateVisTerms();
  }, [search])

  const updateVisTerms = () => {
    const out = []
    terms.forEach((term) => {
      if (term.term.includes(search) || term.definition.includes(search)) out.push(term);
    })
    setVisTerms(out);    
  }

  const searchTerm = (str) => {
    setSearch(str);
  }


  // axios
  useEffect(() => {
    axios.get('/terms')
      .then(response => {
        setTerms(response.data);
        setVisTerms(response.data);
      })
  }, [])

  const addTerm = (t, d) => {

    axios.post('/terms', {
      term: t,
      description: d
    })
      .then(response => {
        const n = [...terms, response.data];
        setTerms(n);
      })
      .catch(err => {
        console.log('adding term unsuccessful: ' + err);
      })
  }

  const deleteTerm = (t) => {
    axios.delete('/terms/' + t)
    .then(response => {
      setTerms(response.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const editTerm = (term, newTerm, newDefinition) => {
    axios.put('/terms/' + term, {
      newTerm,
      newDefinition
    })
    .then(response => {
      setTerms(response.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  // block
  return (
    <div>      
      <h1>My Dictionary</h1>
      <Form  addTerm={addTerm}/>
      <Search searchTerm={searchTerm}/>
      <TermList terms={visTerms} deleteTerm={deleteTerm} editTerm={editTerm} />
    </div>
  )
}

export default App;