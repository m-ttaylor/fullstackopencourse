import { NewPatient, Gender, PatientRequest } from "./types";

const toNewPatient = ({name, dateOfBirth, ssn, gender, occupation}: PatientRequest): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
  };
  return newPatient;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseStringField = (toParse: unknown, expectedField: string): string => {
  if (!toParse || !isString(toParse)) {
    throw new Error('Incorrect or missing ' + expectedField);
  }

  return toParse;
};

const parseName = (name: unknown): string => {
  // if (!name || !isString(name)) {
  //   throw new Error('Incorrect or missing name');
  // }

  // return name;
  return parseStringField(name, 'name');
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  return parseStringField(ssn, 'ssn');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  return parseStringField(occupation, 'occupation');
};

export default toNewPatient;