export interface Diagnosis {
  code: string
  name: string
  latin?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
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
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
