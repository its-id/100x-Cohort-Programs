import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'todos',
    },
  ],
});

const User = mongoose.model('users', UserSchema);
export default User;