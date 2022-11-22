import { NewPatient, Gender, PatientRequest, Diagnosis, HealthCheckRating, NewEntry, EntryRequest, NewHealthcheckEntry, NewHospitalEntry, NewOccupationalHealthcareEntry } from "./types";

export const toNewPatient = ({name, dateOfBirth, ssn, gender, occupation}: PatientRequest): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: []
  };
  return newPatient;
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

export const toNewEntry = (
  {date, type, 
  specialist, description, 
  diagnosisCodes, healthCheckRating, discharge, 
  employerName, sickLeave}: EntryRequest): NewEntry => {
    
    const coercedType = parseType(type);
    switch (coercedType) {
      case "HealthCheck":
        const newHealthCheckEntry: NewHealthcheckEntry = {
          description: parseDescription(description),
          date: parseDate(date),
          specialist: parseSpecialist(specialist),
          diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
          type: coercedType,
          healthCheckRating: parseHealthCheckRating(healthCheckRating)
        };
        return newHealthCheckEntry;
      case "Hospital":
        if (discharge === undefined) {
          throw new Error('Missing required field discharge on entry type '+ type);
        }
        const newHospitalEntry: NewHospitalEntry = {
          description: parseDescription(description),
          date: parseDate(date),
          specialist: parseSpecialist(specialist),
          diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
          type: coercedType,
          discharge: parseDischarge(discharge)
        };
        return newHospitalEntry;
      case "OccupationalHealthcare":
        if (sickLeave === undefined) {
          throw new Error('Missing required field sickLeave on entry type '+ type);
        }
        const newOccupationalHealthcareEntry: NewOccupationalHealthcareEntry = {
          description: parseDescription(description),
          date: parseDate(date),
          specialist: parseSpecialist(specialist),
          diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
          type: coercedType,
          employerName: parseEmployerName(employerName),
          sickLeave: parseSickLeave(sickLeave)
        };
        return newOccupationalHealthcareEntry;
      default:
        return assertNever(coercedType);
    }
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

const parseSpecialist = (specialist: unknown): string => {
  return parseStringField(specialist, 'specialist');
};

type EntryType = "OccupationalHealthcare" | "Hospital" | "HealthCheck";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is EntryType => {
  return Boolean(param as EntryType);
};

const parseType = (type: unknown): EntryType => {
  
  if (!type || !isEntryType(type)) {
    throw new Error('Incorrect or missing entry type ' + type);
  }

  return type;
};

const areDiagnosisCodes = (codes: unknown): codes is Array<Diagnosis['code']> => {
  return codes instanceof Array<Diagnosis['code']>;
};

const parseDiagnosisCodes = (codes: unknown): Array<Diagnosis['code']> => {
  if (!codes || codes === undefined || !areDiagnosisCodes(codes)) {
    throw new Error('Incorrect or missing diagnosis codes');
  }

  return codes;
};

const parseDescription = (description: unknown): string => {
  return parseStringField(description, 'description');
};

const parseEmployerName = (employerName: unknown): string  => {
  return parseStringField(employerName, 'employerName');
};

const parseDischarge = (discharge: {date: unknown, criteria: unknown}): {date: string, criteria: string} => {

  const { date, criteria } = discharge;
  if (discharge !== undefined && discharge && typeof discharge === 'object') {
    discharge['date'];
  }
  if (!discharge || !discharge?.date || !criteria || !isString(date) || !isString(criteria)) {
    throw new Error('Incorrect or missing date/criteria field on discharge');
  }

  return {
    date: parseDate(date),
    criteria: parseStringField(criteria, 'criteria')
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (healthCheckRating: any): healthCheckRating is HealthCheckRating => {
  return Boolean(healthCheckRating === HealthCheckRating.Healthy || healthCheckRating as HealthCheckRating);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  // need to compare to zero to guard against falsy-ness of zero :(
  if ((rating !== 0 && !rating) || !isHealthCheckRating(rating)) {
    throw new Error(`Invalid healthCheckRating: ${rating}`);
  }
  console.log('passed type guard');
  console.log(rating);

  // for some reason without using a switch, javascript will stubbornly pass along a string
  // representation of the rating instead of the numerical enum value
  switch (Number(rating)) {
    case 0:
      return HealthCheckRating.Healthy;
    case 1:
      return HealthCheckRating.LowRisk;
    case 2:
      return HealthCheckRating.HighRisk;
    case 3:
      return HealthCheckRating.CriticalRisk;
    default:
      throw new Error('Invalid healthCheckRating: ' + rating);
  }
};

const parseSickLeave = (
  sickLeave: {startDate: unknown, endDate: unknown}): {startDate: string, endDate: string} => {
  
  const { startDate, endDate } = sickLeave;
  if (!startDate || !endDate || !isString(startDate) || !isString(endDate)) {
    throw new Error('Incorrect or missing startDate/endDate field on sickLeave');
  }

  return {
    startDate: parseDate(startDate),
    endDate: parseDate(endDate),
  };
};