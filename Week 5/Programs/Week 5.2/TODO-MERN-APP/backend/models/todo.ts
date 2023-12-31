import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const Todo = mongoose.model('todos', TodoSchema);
export default Todo;
