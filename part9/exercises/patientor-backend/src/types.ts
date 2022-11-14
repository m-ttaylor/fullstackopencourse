export interface Diagnosis {
  code: string
  name: string
  latin?: string
}

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: string
  occupation: string
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export type PatientRequest = {
  name: unknown, 
  dateOfBirth: unknown, 
  ssn: unknown, 
  gender: unknown, 
  occupation: unknown
};

export type NewPatient = Omit<Patient, 'id'>;
export type SanitizedPatient = Omit<Patient, 'ssn'>;