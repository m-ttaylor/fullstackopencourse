interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExcercisesRequest {
  target: number
  daily_exercises: Array<number>
}

// interface ExerciseValues {
//   value1: Array<number>;
//   value2: number;
// }

// const exerciseParseArguments = (args: Array<string>): ExerciseValues => {
//   if (args.length < 4) throw new Error('Not enough arguments');
//   if (args.length > 365) throw new Error('Too many arguments');

//   // console.log(args[2]);
//   // console.log(args[3]);
//   const value1 : Array<number> = [];
//   for (let i = 3; i < args.length; i++) {
//     if (isNaN(Number(args[i]))) {
//       throw new Error('Provided values were not numbers');
//     } else {
//       value1.push(Number(args[i]));
//     }
//   }
//   if (!isNaN(Number(args[2]))) {
//     return {
//       value1,
//       value2: Number(args[2])
//     };
//   } else {
//     throw new Error('Provided values were not numbers!');
//   }
// };


const calculateExercises = (days: Array<number>, target: number): Result => {
  const periodLength = days.length;

  const trainingDays = days.reduce((sum, value) => {
    return value > 0 ? sum + 1 : sum;
  }, 0);

  const average = days.reduce((sum, value) => {
    return sum + value;
  }, 0) / periodLength;

  let rating: number;

  let ratingDescription = '';
  const diff = target - average;
  if (diff <= 0) {
    rating = 3;
    ratingDescription = 'target met or exceeded';
  }
  else if (diff > 0 && diff < .5) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }
  else {
    rating = 1;
    ratingDescription = 'pretty far off the mark';
  }

  const success = diff <= 0; // We only succeed if we meet or exceed
  // the target average

  const rtn : Result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };

  return rtn;
};

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

// try {
//   const { value1, value2 } = exerciseParseArguments(process.argv);
//   console.log(calculateExercises(value1, value2));
// } catch (error: unknown) {
//   let errorMessage = 'Something bad happened.';
//   if (error instanceof Error) {
//     errorMessage += ' Error: ' + error.message;
//   }
//   console.log(errorMessage);
// }

export { calculateExercises, ExcercisesRequest };