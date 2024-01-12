import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CardSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  interests: { type: [String], required: false },
  socials: {
    type: [
      {
        name: { type: String, required: true },
        img: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    required: false,
  },
});

const Card = mongoose.model('cards', CardSchema);
export default Card;
