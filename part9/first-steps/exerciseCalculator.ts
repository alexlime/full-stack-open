interface TrainingSummary {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArguments = (args: string[]): { target: number; exHours: number[] } => {
  // Ensure there are enough arguments (minimum of 4: node, script, target, and at least one exercise hour)
  if (args.length < 4) throw new Error('Not enough arguments. The first argument should be the target, followed by the exercise hours.');

  // Parse the target value from the third argument (args[2])
  const target = Number(args[2]);
  if (isNaN(target)) throw new Error('Target value must be a number');

  // Parse the remaining arguments as exercise hours
  // args.slice(3) extracts the array starting from the fourth argument to the end
  const exHours = args.slice(3).map(arg => {
    // Convert each argument to a number
    const num = Number(arg);

    // Check if the conversion to number is valid
    if (isNaN(num)) {
      throw new Error(`Invalid value: ${arg} is not a number`);
    }

    // Return the valid number to be included in the exHours array
    return num;
  });

  // Return an object containing the parsed target and exercise hours array
  return { target, exHours };
};

const exHours: number[] = [3, 0, 2, 4.5, 0, 3, 1];

const calculateExercises = (target: number, exHours: number[]): TrainingSummary => {

  // Calculate values
  const periodLength = exHours.length;
  const trainingDays = exHours.filter(day => day > 0).length;
  const totalHours = exHours.reduce((sum, day) => sum + day, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  // Determine rating and description
  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'excellent performance';
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'needs improvement';
  }

  // Return the structured summary
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, exHours } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(target, exHours));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}