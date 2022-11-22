/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import { EntryRequest, PatientRequest } from '../types';
import { toNewEntry, toNewPatient } from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getSanitizedPatients());
});

router.get('/:id', (req, res) => {
  res.send(patientService.findPatientById(req.params.id));
});

router.post('/', (req, res) => {
  try { 
    const newPatient = toNewPatient(req.body as PatientRequest);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  const patientId = req.params.id;
  try {
    const newEntry = toNewEntry(req.body as EntryRequest);
    console.log('attempted new entry values are: ', req.body);
    console.log('after toNewEntry: ', newEntry);
    const addedEntry = patientService.addEntryToPatient(patientId, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;