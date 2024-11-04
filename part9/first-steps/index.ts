import express from 'express';
// import express = require('express');
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  const height = Number(_req.query.height);
  const weight = Number(_req.query.weight);

  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmi = calculateBmi(height, weight);
    res.send({ ..._req.query, bmi });
  } else {
    res.status(400).json({ error: 'Invalid or missing query parameters' });
  }

});

app.post('/exercises', (_req, _res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = _req.body;

  // Check for missing parameters
  if (!daily_exercises || !Array.isArray(daily_exercises)) {
    return _res.status(400).json({ error: 'Parameter "daily_exercises" is missing or not an array' });
  }
  if (!target) {
    return _res.status(400).json({ error: 'Parameter "target" is missing' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // const dailyExercisesNumbers = daily_exercises.map(Number);
  const targetNumber = Number(target);

  // Validate that the conversion did not result in NaN values
  if (isNaN(targetNumber) || daily_exercises.some(isNaN)) {
    return _res.status(400).json({ error: 'Invalid input: daily_exercises and target must be numbers' });
  }

// Call your calculateExercises function with the parsed values
  const result = calculateExercises(targetNumber, daily_exercises);

  // console.log(result);

  return _res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});