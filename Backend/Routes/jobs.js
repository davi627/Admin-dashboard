import express from 'express';
import { Job } from '../Models/jobs.js';

const router = express.Router();

router.get('/jobsPosted', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.delete('/jobsPosted/:id', async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).send('Job not found');
    }
    res.status(200).send('Job deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.put('/jobsPosted/:id', async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) {
      return res.status(404).send('Job not found');
    }
    res.status(200).send(job);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

export { router as jobsRouter };
