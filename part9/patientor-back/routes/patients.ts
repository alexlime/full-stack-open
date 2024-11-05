import express,{ Response } from 'express';
import patientService from '../services/patientService';
import { Patient  } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<Patient[]>) => {
  res.send(patientService.geNonSensitivePatientEntry());
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;