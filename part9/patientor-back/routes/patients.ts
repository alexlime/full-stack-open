import express,{ Response } from 'express';
import patientService from '../services/patientService';
import { Patient  } from '../types';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<Patient[]>) => {
  res.send(patientService.geNonSensitivePatientEntry());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
    
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong :(';
    if (error instanceof Error) {
      errorMessage = 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }

});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;