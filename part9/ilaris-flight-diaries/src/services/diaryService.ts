import diaries from '../../data/diaries';

import {
  NonSensitiveDiaryEntry,
  DiaryEntry,
  NewDiaryEntry
} from '../types';

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id);
  return entry;
};

const addDiary = (
  newEntry: NewDiaryEntry
): DiaryEntry => {

const newDiaryEntry = {
  id: Math.max(...diaries.map(d => d.id)) + 1,
  ...newEntry
};

diaries.push(newDiaryEntry);
return newDiaryEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addDiary,
  findById
};