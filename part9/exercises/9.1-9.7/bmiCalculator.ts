type BmiResult = 'underweight' | 'Normal (healthy weight)' | 'overweight' | 'obese'

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

console.log(calculateBmi(180, 74))