import { useState } from 'react'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td> 
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {

  const total = good+neutral+bad
  if (total > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={((good*1+bad*(-1))/total).toFixed(4)} />
          <StatisticLine text="positive" value={(good / (total) * 100).toFixed(4) + '%'}/>
        </tbody>
      </table>
    )
  }
  return (
    <div>
    No feedback given
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onGoodClick = () => {
    return setGood(good+1)
  }

  const onNeutralClick = () => {
    return setNeutral(neutral+1)
  }

  const onBadClick = () => {
    return setBad(bad+1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      
      <br />
      <Button onClick={onGoodClick} text='good' />
      <Button onClick={onNeutralClick} text='neutral' />
      <Button onClick={onBadClick} text='bad' />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App