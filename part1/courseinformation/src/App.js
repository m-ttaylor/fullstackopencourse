const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (<>
    <p>{props.part} {props.exercises}</p>
  </>)
}

const Content = (props) => {
  console.log(props)
  return(
      <>
        <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
        <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
        <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
      </>
  )
}

const Total = (props) => {

  let total = 0
  props.parts.forEach(({exercises}) => total+= exercises)

  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      }, 
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  console.log(`The total is ${4}`)

  return (
    <div>
      <Header course={course.name}/>
      
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

export default App