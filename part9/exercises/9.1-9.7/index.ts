import express from 'express';
import bodyParser from 'body-parser';

import { calculateBmi } from './bmiCalculator';
import { calculateExercises, ExcercisesRequest } from './exerciseCalculator';

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  console.log(req.query);
  const { height, weight } = req.query;
  if (height === undefined || weight === undefined) {
    return res.status(400).send({ error: 'not enough paramters' }); 
  }
  let bmi, response;
  try {
    bmi = calculateBmi(height, weight);
    response = {
      weight: req.query.weight,
      height: req.query.height,
      bmi
    };
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
    response = { error: 'malformated parameters' };
    return res.status(400).send(response);
  }

  return res.send(response);
});

app.post('/exercises', (req, res) => {
  const {daily_exercises, target} = req.body as ExcercisesRequest;
  const result = calculateExercises(daily_exercises, target);
  return res.send(result);
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});