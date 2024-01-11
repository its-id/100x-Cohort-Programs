import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

const User = mongoose.model('week5users', UserSchema);
export default User;
