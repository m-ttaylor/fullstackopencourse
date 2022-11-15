/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patients from '../../data/patients';
import { NewPatient, Patient, SanitizedPatient } from '../types';

import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getSanitizedPatients = (): SanitizedPatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const findPatientById = (id: string): Patient | undefined  => {
  const patient = patients.find(p => p.id === id);
  return patient;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();
  const newPatient = {
    id,
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getSanitizedPatients,
  addPatient,
  findPatientById
};