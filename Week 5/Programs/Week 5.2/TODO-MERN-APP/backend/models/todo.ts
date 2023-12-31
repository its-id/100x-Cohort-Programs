import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model('todos', TodoSchema);
export default Todo;
