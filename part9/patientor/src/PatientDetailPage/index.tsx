import React from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";
import { Diagnosis, Entry, HealthCheckRating, NewEntryFormValues, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { setPatient, setDiagnoses, useStateValue, addEntry } from "../state";
import { useParams } from "react-router-dom";

import EntryDetails from './EntryDetails';
import { AddEntryForm } from "./AddEntryForm";
import { Alert } from "@material-ui/lab";


const PatientDetailPage = () => {
  const [{ currentPatient, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [error, setError] = React.useState<string>(); 


  const submitNewEntry = async (values: NewEntryFormValues) => {
    console.log(values);
    const valuesToSubmit = {...values};
    
    if (valuesToSubmit.type === "HealthCheck") {
      if (typeof valuesToSubmit.healthCheckRating === 'string') {
        console.log("doing this");

        const rating = valuesToSubmit.healthCheckRating as unknown as string;
        switch (rating) {
          case "Healthy":
            valuesToSubmit.healthCheckRating = HealthCheckRating.Healthy;
            break;
          case "LowRisk":
            valuesToSubmit.healthCheckRating = HealthCheckRating.LowRisk;
            break;
          case "HighRisk":
            valuesToSubmit.healthCheckRating = HealthCheckRating.HighRisk;
            break;
          case "CriticalRisk":
            valuesToSubmit.healthCheckRating = HealthCheckRating.CriticalRisk;
            break;
        }
      }
    }

    if (valuesToSubmit.type === "OccupationalHealthcare") {
      if (valuesToSubmit.sickLeave?.startDate === "" || valuesToSubmit.sickLeave?.endDate === "") {
        valuesToSubmit.sickLeave = undefined;
      }
    }

    console.log('modified values');
    console.log(valuesToSubmit);
 
    try {
      console.log('making an axios request!');
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${currentPatient.id}/entries`,
        valuesToSubmit
      );
  
      dispatch(addEntry({patient: currentPatient, entry: newEntry}));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data) || "Unrecognized axios error");
        console.log('the error', error);
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };
  
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
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <AddEntryForm onSubmit={submitNewEntry} onCancel={() => console.log('foo')} />
    </div>
  );
};

export default PatientDetailPage;