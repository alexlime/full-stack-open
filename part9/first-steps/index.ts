import express from 'express';
// import express = require('express');
import { calculateBmi } from './bmiCalculator';
const app = express();


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  const height = Number(_req.query.height)
  const weight = Number(_req.query.weight)

  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmi = calculateBmi(height, weight);
    res.send({ ..._req.query, bmi });
  } else {
    res.status(400).json({ error: 'Invalid or missing query parameters' });
  }

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});