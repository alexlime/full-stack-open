import express,{ Response } from 'express';
import diagnosesService from '../services/diagnosesService';
import { Diagnose } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnose[]>) => {
  res.send(diagnosesService.getDagnoses());
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;