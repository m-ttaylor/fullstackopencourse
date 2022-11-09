interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (days: Array<number>): Result => {
  
  const target = 2;

  const periodLength = days.length;

  const trainingDays = days.reduce((sum, value) => {
    return value > 0 ? sum + 1 : sum;
  }, 0)

  const average = days.reduce((sum, value) => {
    return sum + value;
  }, 0) / periodLength;

  let rating: number;

  let ratingDescription = '';
  const diff = target - average
  if (diff <= 0) {
    rating = 3;
    ratingDescription = 'target met or exceeded'
  }
  else if (diff > 0 && diff < .5) {
    rating = 2;
    ratingDescription = 'not too bad but could be better'
  }
  else {
    rating = 1;
    ratingDescription = 'pretty far off the mark'
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
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]))