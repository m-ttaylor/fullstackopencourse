import patients from '../../data/patients';
import { Patient, SanitizedPatient } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getSanitizedPatients = (): SanitizedPatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatients = () => {
  return null;
};

export default {
  getPatients,
  getSanitizedPatients,
  addPatients
};