import React from "react";
import axios from "axios";
import { Typography, Button, Grid } from "@material-ui/core";
import { Diagnosis, Entry, HealthCheckRating, NewHealthcheckEntry, NewHospitalEntry, NewOccupationalHealthcareEntry, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { setPatient, setDiagnoses, useStateValue, addEntry } from "../state";
import { useParams } from "react-router-dom";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import {LocalHospital, MedicalServices, MedicationLiquid} from '@mui/icons-material';
import { Formik, Form, Field} from "formik";
import { EntryTypeOption, SelectTypeField, TextField } from '../AddPatientModal/FormField';

// import { EntryFormValues } from "../AddPatientModal/AddEntryForm";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import EntryDetails from './EntryDetails';

// type EntryFormValues = Omit<Entry, "id">;
// type EntryFormValues = Omit<OccupationalHealthcareEntry, 'id'> | Omit<HospitalEntry, 'id'> | Omit<HealthCheckEntry, 'id'>;

interface Props {
  onSubmit: (values: NewHealthcheckEntry | NewHospitalEntry | NewOccupationalHealthcareEntry) => void;
  onCancel: () => void;
}

const PatientDetailPage = () => {
  const [{ currentPatient, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [error, setError] = React.useState<string>(); 


  const submitNewEntry = async (values: NewHealthcheckEntry | NewHospitalEntry | NewOccupationalHealthcareEntry) => {
    console.log('AHHHHHHHHHHHHH');
    console.log(values);
    if (values.type === "HealthCheck") {
      if (typeof values.healthCheckRating === 'string') {
        console.log("doing this");

        const temp = values.healthCheckRating as unknown as string;
        switch (temp) {
          case "Healthy":
            values.healthCheckRating = HealthCheckRating.Healthy;
            break;
          case "LowRisk":
            values.healthCheckRating = HealthCheckRating.LowRisk;
            break;
          case "HighRisk":
            values.healthCheckRating = HealthCheckRating.HighRisk;
            break;
          case "CriticalRisk":
            values.healthCheckRating = HealthCheckRating.CriticalRisk;
            break;
        }
      }
      console.log('updated values');
      console.log(values);
    }
 
    try {
      console.log('making an axios request!');
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${currentPatient.id}/entries`,
        values
      );
  
      // console.log(newPatient);
      dispatch(addEntry({patient: currentPatient, entry: newEntry}));
      // closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
        console.log(error);
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
      <AddEntryForm onSubmit={submitNewEntry} onCancel={() => console.log('foo')} />
    </div>
  );
};

// const [modalOpen, setModalOpen] = React.useState<boolean>(false);

// const closeForm = (): void => console.log('closing form');
// const openModal = (): void => setModalOpen(true);

// const closeModal = (): void => {
//   setModalOpen(false);
//   setError(undefined);
// };

const typeOptions: EntryTypeOption[] = [
  { value: "Hospital", label: "Hospital" },
  { value: "HealthCheck", label: "HealthCheck" },
  { value: "OccupationalHealthcare", label: "OccupationalHealthcare" },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "HealthCheck",
        healthCheckRating: HealthCheckRating.Healthy,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        if (values.type === "HealthCheck" && !values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        return errors;
      }}
    >
    {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

      return (
        
          <Form className="form ui">
            {/* // ... */}
            <Field
              label="description"
              placeholder="foo"
              name="description"
              component={TextField}
            />
            <Field
              label="date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="specialist"
              placeholder="foo"
              name="specialist"
              component={TextField}
            />
            <Field
              label="healthCheckRating"
              placeholder="Healthy"
              name="healthCheckRating"
              component={TextField}
            />
            {/* <Field
              label="Occupation"
              placeholder="Occupation"
              name="occupation"
              component={TextField}
            /> */}
            {/* <SelectField label="diagnoses" name="diagnoses" options={diagnoses} /> */}
            <SelectTypeField label="type" name="type" options={typeOptions} />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />    

            {/* // ... */}
          <Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                style={{ float: "left" }}
                type="button"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{
                  float: "right",
                }}
                type="submit"
                variant="contained"
                disabled={!dirty || !isValid}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Form>
      );
    }}
  </Formik>
  );
};

export default PatientDetailPage;