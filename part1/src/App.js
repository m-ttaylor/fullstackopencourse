import { useState } from 'react'

const Hello = ({name, age}) => {

  const bornYear = () => new Date().getFullYear() - age
  
  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by <a href="https://github.com/m-ttaylor/">m-ttaylor</a>
    </div>
  )
}

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Display = ({value}) => <div>{value}</div>

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  const [ value, setValue ] = useState(0)
  // const [left, setLeft] = useState(0)
  // const [right, setRight] = useState(0)
  // const [allClicks, setAll] = useState([])

  // const handleLeftClick = () => {
  //   setAll(allClicks.concat('L'))
  //   setLeft(left+1)
  // }

  // const handleRightClick = () => {
  //   setAll(allClicks.concat('R'))
  //   setRight(right+1)
  // }

  const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  // const increaseByOne = () => setCounter(counter+1)
  // const setToZero = () => setCounter(0)
  // const decreaseByOne = () => setCounter(counter-1)

  // setTimeout(() => setCounter(counter + 1), 1000)
  
  return (
    <div>
      <Display value={value} />
      <Button onClick={() => setToValue(1000)} text='thousand' />
      <Button onClick={() => setToValue(0)} text='reset'/>
      <Button onClick={() => setToValue(value+1)} text='increment' />
    </div>
    // <div>
    //   {left}
    //   <Button handleClick={handleLeftClick} text='left' />
    //   <Button handleClick={handleRightClick} text='right' />
    //   {right}
    //   <History allClicks={allClicks} />
    // </div>

// <Display counter={counter}/>
// <Button onClick={increaseByOne} text='plus' />
// <Button onClick={setToZero} text='zero'/>
// <Button onClick={decreaseByOne} text='minus' />
  )
  // const name = 'Peter'
  // const age = 10
  // return (
  //   <>
  //     <h1>Greetings</h1>
  //     <Hello name="Maya" age={26+10} />
  //     <Hello name={name} age={age} />
  //     <Footer />
  //   </>
  // )
  // const now = new Date();
  // const a = 10
  // const b = 20

  // return (
  //   <div>
  //     <p>Hello world, it is {now.toString()}</p>
  //     <p>
  //       {a} plus {b} is {a + b}
  //     </p>
  //   </div>
  //   )
  }

export default App