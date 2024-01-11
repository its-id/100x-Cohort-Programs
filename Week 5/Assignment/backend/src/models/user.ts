import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String },
  cards: [{ type: Schema.Types.ObjectId, ref: 'cards' }],
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, //enum: means that the role can only be user or admin
});

const User = mongoose.model('week5users', UserSchema);
export default User;
