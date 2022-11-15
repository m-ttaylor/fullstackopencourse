import React from "react";
import axios from "axios";
import { Box, Typography } from "@material-ui/core";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { setPatient, useStateValue } from "../state";
import { useParams } from "react-router-dom";

const PatientDetailPage = () => {
  const [{ currentPatient }, dispatch] = useStateValue();
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

  if (id === undefined) {
    return (<>no id</>);
  }

  console.log(`id of current patient is: ${id}`);

  if (currentPatient == undefined) {
    return (<>no data yet</>);
  }

  let genderSymbol = "";
  if (currentPatient.gender === "female") genderSymbol =  "♀";
  else if (currentPatient.gender === "male") genderSymbol = "♂";
  
  return (
    <div className="App">
      <Box>
        <Typography align="left" variant="h6">
          {currentPatient.name} {genderSymbol}
        </Typography>
      </Box>
      <p>ssh: {currentPatient.ssn}</p>
      <p>occupation: {currentPatient.occupation}</p>
    </div>
  );
};

export default PatientDetailPage;