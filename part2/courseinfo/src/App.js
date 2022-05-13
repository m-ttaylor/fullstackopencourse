import Course from './modules/Course'

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
          { 
            id: 1,
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            id: 2,
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            id: 3,
            name: 'State of a component',
            exercises: 14
          },
          {
            id: 4,
            name: 'Posture',
            exercises: 11
        }
      ]
    },
    {
      id: 2,
      name: 'The Other Half of the Stack application development',
      parts: [
        {
          id: 1,
          name: 'Fundamentals of half and half',
          exercises: 78
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => <Course key={course.id} course={course}/>)}
    </div>
  )
}

export default App