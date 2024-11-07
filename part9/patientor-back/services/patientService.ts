import data from '../data/patients';
import { Patient, NonSensitivePatientEntry, NewPatient } from '../types';
import { v1 } from 'uuid';

const getPatients = (): Patient[] => {
  return data;
};

const geNonSensitivePatientEntry = (): NonSensitivePatientEntry[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

// Modified addPatient function
const addPatient = (entry: NewPatient): Patient => {
  const id: string = v1();

  const newPatient: Patient = {
    id,
    ...entry,
  };

  data.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
  geNonSensitivePatientEntry
};


