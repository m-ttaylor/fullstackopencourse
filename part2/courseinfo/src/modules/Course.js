const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <b>total of {sum} exercises</b>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    parts.map(part => 
      <Part key={part.id} part={part} />
    )
  )
}

const Course = ({ course }) => {
  const total = course.parts.reduce((count, part) => count + part.exercises, 0)
  
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={total} />
    </>
  )
}

export default Course