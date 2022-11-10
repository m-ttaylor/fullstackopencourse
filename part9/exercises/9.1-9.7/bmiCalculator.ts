type BmiResult = 'underweight' | 'Normal (healthy weight)' | 'overweight' | 'obese';

interface BmiArgs {
  parsedHeight: number;
  parsedWeight: number;
}

const parseArguments = (args: Array<string | unknown>): BmiArgs => {
  if (args.length < 2) throw new Error('Not enough arguments');
  if (args.length > 2) throw new Error('Too many arguments');

  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return {
      parsedHeight: Number(args[0]),
      parsedWeight: Number(args[1])
    };
  } else {
    throw new Error('Provided values were not valid!');
  }
};

const calculateBmiExposed = ( 
  height: unknown, 
  weight: unknown): BmiResult => {
    const {parsedHeight, parsedWeight} = parseArguments([height, weight]);
    return calculateBmi(parsedHeight, parsedWeight);
};

const calculateBmi = ( height: number, weight: number ): BmiResult => {
  // height in cm (converted to m), weight in kg
  const bmi = weight / (height/100) ** 2;
  console.log('bmi is', bmi);
  if (bmi < 18.5) {
    return 'underweight';
  }
  else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal (healthy weight)';
  }
  else if (bmi > 25 && bmi < 30) {
    return 'overweight';
  }
  else return 'obese';
};

// try {
//   console.log(process.argv);

//   const { value1, value2 } = parseArguments(process.argv);
//   console.log(calculateBmi(value1, value2));
// } catch (error: unknown) {
//   let errorMessage = 'Something bad happened.'
//   if (error instanceof Error) {
//     errorMessage += ' Error: ' + error.message
//   }
//   console.log(errorMessage)
// }

export { calculateBmiExposed as calculateBmi};