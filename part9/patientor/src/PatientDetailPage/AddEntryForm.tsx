import { Button, Grid } from "@material-ui/core";
import { Formik, Form, Field} from "formik";

import { EntryTypeOption, SelectTypeField, TextField } from '../AddPatientModal/FormField';
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { HealthCheckRating, NewEntryFormValues } from "../types";
import { useStateValue } from "../state";

const typeOptions: EntryTypeOption[] = [
  { value: "Hospital", label: "Hospital" },
  { value: "HealthCheck", label: "HealthCheck" },
  { value: "OccupationalHealthcare", label: "OccupationalHealthcare" },
];

interface Props {
  onSubmit: (values: NewEntryFormValues) => void;
  onCancel: () => void;
  // setError: (error: string) => void;
}

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
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
        discharge: {
          date: "",
          criteria: ""
        },
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        }
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
        // another annoying !== 0 check because 0 is falsey
        if (values.type === "HealthCheck" && (values.healthCheckRating !== 0 && !values.healthCheckRating)) {
          errors.healthCheckRating = requiredError;
        }

        if (values.type === "Hospital") {
          if (!values.discharge) {
            errors.discharge = requiredError;
          }
        }

        if (values.type === "OccupationalHealthcare") {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
        }
        
        // // For debugging, but it's a bit noisy to have errors rendoring while editing the form
        // setError(
        //   Object.entries(errors).map(
        //     ([k, v]: [string, string]) => `${v}: ${k}`
        //   ).join(", ")
        // );
        return errors;
      }}
    >
    {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
      if (values.type === "HealthCheck") {
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
                placeholder="0"
                name="healthCheckRating"
                component={TextField}
              />
              <SelectTypeField label="type" name="type" options={typeOptions} />
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
              />    
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
      } else if (values.type === "Hospital") {
          return (
            <Form className="form ui">
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
                label="dischargedate"
                placeholder="YYYY-MM-DD"
                name="discharge.date"
                component={TextField}
              />
              <Field
                label="dischargecriteria"
                placeholder="reason"
                name="discharge.criteria"
                component={TextField}
              />
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
      } else if (values.type === "OccupationalHealthcare") {
          return (
            <Form className="form ui">
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
                label="employer name"
                placeholder="Business, Inc."
                name="employerName"
                component={TextField}
              />
              <Field
                label="sick leave start"
                placeholder="YYYY-MM-DD"
                name="sickLeave.startDate"
                component={TextField}
              />
              <Field
                label="sick leave end"
                placeholder="YYYY-MM-DD"
                name="sickLeave.endDate"
                component={TextField}
              />
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
      }
    }}
  </Formik>
  );
};
