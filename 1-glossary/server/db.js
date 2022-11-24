const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/glossary');

const termSchema = new mongoose.Schema({
  term: {
    type: String,
    unique: true
  },
  definition: String
})

const Term = mongoose.model('Term', termSchema);

const saveTerm = (_term, _definition) => {
  const term = new Term();
  term.term = _term;
  term.definition = _definition;
  return term.save();
}

const getTerms = () => {
  return Term.find({});
}

const deleteTerm = (term) => {
  return Term.deleteMany({term: term});
}

const modifyTerm = (term, newTerm, newDefinition) => {
  return Term.updateMany(
    { term: term },
    {
      $set: { term: newTerm, definition: newDefinition }
    }
  )
}

module.exports.saveTerm = saveTerm;
module.exports.getTerms = getTerms;
module.exports.deleteTerm = deleteTerm;
module.exports.modifyTerm = modifyTerm;
