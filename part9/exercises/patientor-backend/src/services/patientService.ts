/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patients from '../../data/patients';
import { Entry, NewPatient, Patient, PublicPatient } from '../types';

import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getSanitizedPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
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

const addEntryToPatient = (patientId: string, entry: Omit<Entry, 'id'>): Entry => {
  const patient = patients.find(p => p.id === patientId);
  if (patient === undefined) {
    throw new Error("Patient not found");
  }
  const id = uuid();
  const newEntry = {
    id,
    ...entry
  } as Entry;

  patient.entries.push(newEntry);
  // patients = patients.map(p => p.id === patientId ? patient)
  return newEntry;
};

export default {
  getPatients,
  getSanitizedPatients,
  addPatient,
  findPatientById,
  addEntryToPatient
};