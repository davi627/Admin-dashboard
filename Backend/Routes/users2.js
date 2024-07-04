import express from 'express';
import { User2 } from '../Models/users2.js';

const router = express.Router();

router.get('/usernames', async (req, res) => {
  try {
    const users = await User2.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.delete('/usernames/:id', async (req, res) => {
  try {
    const user = await User2.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send('User deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.put('/usernames/:id', async (req, res) => {
  try {
    const user = await User2.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

export { router as UserRouter2 };
