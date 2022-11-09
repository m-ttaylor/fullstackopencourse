type BmiResult = 'underweight' | 'Normal (healthy weight)' | 'overweight' | 'obese'

interface BmiArgs {
  value1: number;
  value2: number;
}
const parseArguments = (args: Array<string>): BmiArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not valid!');
  }
}

const calculateBmi = ( height: number, weight: number ): BmiResult => {
  // height in cm (converted to m), weight in kg
  const bmi = weight / (height/100) ** 2
  console.log('bmi is', bmi)
  if (bmi < 18.5) {
    return 'underweight'
  }
  else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal (healthy weight)'
  }
  else if (bmi > 25 && bmi < 30) {
    return 'overweight'
  }
  else return 'obese'
}

try {
  console.log(process.argv);

  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}