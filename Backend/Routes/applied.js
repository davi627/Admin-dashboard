import express from 'express';
import { Apply } from '../Models/applied.js';

const router = express.Router();

router.get('/JobsApplied', async (req, res) => {
  try {
    const applied = await Apply.find();
    res.json(applied);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.delete('/JobsApplied/:id', async (req, res) => {
  try {
    const applied = await Apply.findByIdAndDelete(req.params.id);
    if (!applied) {
      return res.status(404).send('Application not found');
    }
    res.status(200).send('Application deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.put('/JobsApplied/:id', async (req, res) => {
  try {
    const applied = await Apply.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!applied) {
      return res.status(404).send('Application not found');
    }
    res.status(200).send(applied);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

export { router as appliedRouter };
