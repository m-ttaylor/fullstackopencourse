import { LocalHospital, MedicalServices, MedicationLiquid } from "@mui/icons-material";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Diagnosis, Entry, HealthCheckRating } from "../types";

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
  console.log('healthCheckRating according to heart component', healthCheckRating);

  switch (healthCheckRating) {
    case HealthCheckRating.Healthy:
      color = 'green';
      break;
    case HealthCheckRating.LowRisk:
      console.log(`how is ${healthCheckRating} yellow??`);
      color = 'yellow';
      break;
    case HealthCheckRating.HighRisk:
      color = 'orange';
      break;
    case HealthCheckRating.CriticalRisk:
      color = 'red';
      break;
    default:
      color = 'yellow';
      break;
  }

  console.log('settled on color for heart: ', color);
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

export default EntryDetails;