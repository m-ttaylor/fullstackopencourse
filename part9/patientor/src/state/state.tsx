import React, { createContext, useContext, useReducer } from "react";
import { Diagnosis, Gender, Patient } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient },
  currentPatient: Patient,
  diagnoses: Diagnosis[]
};

const initialState: State = {
  patients: {},
  currentPatient: {id: "", name: "", ssn: "", gender: Gender.Other, occupation: "", dateOfBirth: "", entries: []},
  diagnoses: []
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
