import React from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";
import { Diagnosis, Entry, Patient, HealthCheckRating } from "../types";
import { apiBaseUrl } from "../constants";
import { setPatient, setDiagnoses, useStateValue } from "../state";
import { useParams } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {LocalHospital, MedicalServices, MedicationLiquid} from '@mui/icons-material';

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const entryStyle: React.CSSProperties = {
  margin: 4,
  borderStyle: 'solid',
  borderRadius: 10,
  padding: 3,
};

const HealthRating = ({ healthCheckRating }: 
  {healthCheckRating: HealthCheckRating}) => {
  let color: string;
  switch (healthCheckRating) {
    case 0:
      color = 'green';
      break;
    case 1:
      color = 'yellow';
      break;
    case 2:
      color = 'orange';
      break;
    case 3:
      color = 'red';
      break;
    default:
      color = 'yellow';
      break;
  }
  return <FavoriteIcon style={{color: color}}/>;
};

const OccupationalHealthcareEntry = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {
  if (entry.type !== "OccupationalHealthcare" ) {
    throw new Error("Unhandled type issue");
  }
  return (
    <div style={entryStyle}>
      <p>{entry.date} <MedicationLiquid /> {entry.employerName}</p>
      <p style={{fontStyle: 'italic'}}>{entry.description}</p>
      {entry.diagnosisCodes?.map((c) => (
        <li key={c}>{c} {diagnoses.find(d => d.code === c)?.name} </li>
      ))}
      <p>diagnosed by {entry.specialist}</p>
    </div>
  );
};

const HealthCheckEntryDetails = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {
  if (entry.type !== "HealthCheck" ) { // this shouldn't be possible due to the exhaustive type checking,
    // but the compiler won't allow entry.healthCheckRating without doing either this, or exposing
    // the type and importing it to type the entry prop here.
    throw new Error("Unhandled type issue");
  }
  return (
    <div style={entryStyle}>
      <p>{entry.date} <MedicalServices /></p>
      <p style={{fontStyle: 'italic'}}>{entry.description}</p>
      {entry.diagnosisCodes?.map((c: Diagnosis['code']) => (
        <li key={c}>{c} {diagnoses.find(d => d.code === c)?.name} </li>
      ))}
      <HealthRating healthCheckRating={entry.healthCheckRating} />
      <p>diagnosed by {entry.specialist}</p>
    </div>
  );
};

const HospitalEntry = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {
  return (
    <div style={entryStyle}>
      <p>{entry.date} <LocalHospital /></p>
      <p style={{fontStyle: 'italic'}}>{entry.description}</p>
      {entry.diagnosisCodes?.map((c) => (
        <li key={c}>{c} {diagnoses.find(d => d.code === c)?.name} </li>
      ))}
      <p>diagnosed by {entry.specialist}</p>
    </div>
  );
};

const EntryDetails = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {
  switch (entry.type) {
    case "OccupationalHealthcare":
      return (<OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses}/>);
    case "HealthCheck":
      return (<HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />);
    case "Hospital":
      return(<HospitalEntry entry={entry} diagnoses={diagnoses} />);
    default:
      return assertNever(entry);
  }
};

const PatientDetailPage = () => {
  const [{ currentPatient, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  
  console.log('current patient', currentPatient || 'nada');

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        console.log('TRYING an API call');
        if (id === undefined) console.log('id not defined');
        else if ( currentPatient !== undefined && currentPatient.id === id) {
          console.log('not refetching patient info');
        } else {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patient));
        }
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, [dispatch, id]);


  React.useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnoses } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`);
          dispatch(setDiagnoses(diagnoses));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnoses();
  }, [dispatch]);

  if (id === undefined) {
    return (<>no id</>);
  }

  console.log(`id of current patient is: ${id}`);

  if (currentPatient == undefined || diagnoses.length < 1) {
    return (<>no data yet</>);
  }

  let genderSymbol = "";
  if (currentPatient.gender === "female") genderSymbol =  "♀";
  else if (currentPatient.gender === "male") genderSymbol = "♂";
  
  return (
    <div className="App">
      <Typography align="left" variant="h6">
        {currentPatient.name} {genderSymbol}
      </Typography>
      <p>ssh: {currentPatient.ssn}</p>
      <p>occupation: {currentPatient.occupation}</p>
      <h2>entries</h2>
      {currentPatient.entries.map(e => (
        <EntryDetails key={e.id} entry={e} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientDetailPage;