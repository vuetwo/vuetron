const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  note: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'active'
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
