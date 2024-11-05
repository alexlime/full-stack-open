import data from '../data/diagnoses';
import { Diagnose } from '../types';

const getDagnoses = (): Diagnose[] => {
  return data;
};

export default {
  getDagnoses
};