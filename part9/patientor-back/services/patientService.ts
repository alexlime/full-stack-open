import data from '../data/patients';
import { Patient, NonSensitivePatientEntry } from '../types';

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

export default {
  getPatients,
  geNonSensitivePatientEntry
};