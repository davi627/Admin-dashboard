import express from 'express';
import { User } from '../Models/users.js';

const router = express.Router();

router.get('/names', async (req, res) => {
  try {
    const names = await User.find({}, 'username');
    res.json(names);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.delete('/names/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send('User deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.put('/names/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

export { router as UserRouter };
