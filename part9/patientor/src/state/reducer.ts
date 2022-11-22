import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  } |
  {
    type: "ADD_ENTRY";
    payload: {patient: Patient, entry: Entry}
  };


  // { type: "SET_PATIENT_LIST", payload: patientListFromApi }
export const setPatients = ( patientList: Patient[] ): Action => {
  return ({
    type: "SET_PATIENT_LIST",
    payload: patientList, 
  });
};

export const addPatient = ( patient: Patient ): Action => {
  return ({
    type: "ADD_PATIENT",
    payload: patient
  });
};

export const setPatient = ( patient: Patient ): Action => {
  return ({
    type: "SET_PATIENT",
    payload: patient
  });
};

export const setDiagnoses = ( diagnoses: Diagnosis[] ): Action => {
  return ({
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnoses,
  });
};

export const addEntry = ( { patient, entry} : {patient: Patient, entry: Entry}): Action => {
  return ({
    type: "ADD_ENTRY",
    payload: { patient, entry},
  });
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        currentPatient: action.payload          
        
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: action.payload
      };
    case "ADD_ENTRY":
      const { patient, entry } = action.payload;
      return {
        ...state,
        patients: {
          ...state.patients,
          [patient.id]: {
            ...patient,
            [entry.id]: action.payload.entry
          }
        }
      };
    default:
      return state;
  }
};
