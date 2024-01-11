import { Request, Response } from 'express';

import Card from '../models/card';
import { createCardSchema, updateCardSchema } from '../types';

const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find();
    return res.status(200).json({ cards });
  } catch (error) {
    throw error;
  }
};

const createCard = async (req: Request, res: Response) => {
  try {
    const { name, description, interests, socials } = req.body;
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
    const { id } = req.params;
    const { name, description, interests, socials } = req.body;

    const updatedPayload = {
      name,
      description,
      interests: interests ? interests : [],
      socials: socials ? socials : [],
    };

    const parsedPayload = updateCardSchema.safeParse(updatedPayload);
    if (!parsedPayload.success)
      return res.status(411).json({ error: parsedPayload.error });

    const card = await Card.findByIdAndUpdate(
      { _id: id },
      { $set: updatedPayload }, // $set is used to update the fields if they exist or create them if they don't
      { new: true }
    );

    if (card) return res.status(200).json({ card, message: 'Card updated successfully!' });
    return res.status(404).json({ error: 'No card found!' });
  } catch (err) {
    return res.status(500).json({ error: 'Some error occurred!' });
  }
};

const deleteCard = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const parsedPayload = updateCardSchema.safeParse({ id });

    if (!parsedPayload.success) {
      res.status(411).json({ error: parsedPayload.error });
      return;
    }

    const card = await Card.findByIdAndDelete({ _id: parsedPayload });
    if (card) {
      return res.status(200).json({ message: 'Card deleted successfully' });
    }
    return res.status(404).json({ error: 'No card found!' });
  } catch (error) {
    throw error;
  }
};

export { getCards, createCard, deleteCard, updateCard };
