import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  console.log(req.query);
  const { height, weight } = req.query;
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
    response = {error: 'malformated parameters'};
  }

  if (response.error) {
    res.status(400).send(response);
  } else {
    res.send(response);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});