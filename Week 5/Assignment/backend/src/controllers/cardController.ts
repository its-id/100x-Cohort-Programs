import { Request, Response } from 'express';

import Card from '../models/card';
import User from '../models/user';
import { createCardSchema, updateCardSchema } from '../types';

const getCards = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user: any = await User.findOne({ email });

    if (user.role === 'admin') {
      const cards = await Card.find({});
      return res.status(200).json({ cards });
    } else {
      //if user is not admin, return only his cards
      const cards = await Card.find({ _id: { $in: user.cards } });
      return res.status(200).json({ cards });
    }
  } catch (error) {
    throw error;
  }
};

const createCard = async (req: Request, res: Response) => {
  try {
    const { email, name, description, interests, socials } = req.body;
    const updatedPayload = {
      name,
      description,
      interests: interests ? interests : [],
      socials: socials ? socials : [],
    };
    const parsedPayload = createCardSchema.safeParse(updatedPayload);

    if (!parsedPayload.success) {
      res.status(411).json({ error: parsedPayload.error });
      return;
    }

    const card = new Card(updatedPayload);
    await card.save();

    const user: any = await User.findOne({ email });
    user.cards.push(card._id);
    await user.save();

    return res.status(201).json({
      card,
      message: 'Card created Successfully',
    });
  } catch (error) {
    return res.status(500).json({ error: 'Some error occurred!' });
  }
};

const updateCard = async (req: Request, res: Response) => {
  try {
    const parsedId = updateCardSchema.safeParse({ id: req.params.id });
    if (!parsedId.success) return res.status(411).json({ error: parsedId.error });

    const { email, name, description, interests, socials } = req.body;

    const updatedPayload = {
      name,
      description,
      interests,
      socials
    };

    const user: any = await User.findOne({ email });
    if (user.role !== 'admin') return res.status(401).json({ error: 'Unauthorized' });

    const parsedPayload = createCardSchema.safeParse(updatedPayload);
    if (!parsedPayload.success) return res.status(411).json({ error: parsedPayload.error });

    const card = await Card.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: updatedPayload }, // $set is used to update the fields if they exist or create them if they don't
      { new: true }
    );

    if (card)
      return res
        .status(200)
        .json({ card, message: 'Card updated successfully!' });
    return res.status(404).json({ error: 'No card found!' });
  } catch (err) {
    return res.status(500).json({ error: 'Some error occurred!' });
  }
};

const deleteCard = async (req: Request, res: Response) => {

  const { email } = req.body;
  try {
    const parsedId = updateCardSchema.safeParse({ id: req.params.id });
    if (!parsedId.success) return res.status(411).json({ error: parsedId.error });

    const user: any = await User.findOne({ email });
    if (user.role !== 'admin')
      return res.status(401).json({ error: 'Unauthorized' });

    const card = await Card.findByIdAndDelete({ _id: req.params.id });
    if (card) return res.status(200).json({ message: 'Card deleted successfully' });
    return res.status(404).json({ error: 'No card found!' });

  } catch (error) {
    return res.status(500).json({ error: 'Some error occurred!' });
  }
};

export { getCards, createCard, deleteCard, updateCard };
