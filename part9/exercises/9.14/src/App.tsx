// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartExtended extends CoursePartBase {
  description: string
}

interface CourseNormalPart extends CoursePartExtended {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartExtended {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartExtended {
  type: "special";
  requirements: string[];

}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const assertNever = (value: never): never => {
 throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`
 );
}

const Header = ({ name }: { name: string }) => {
  return <h1>{name}</h1>;
};

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
  <>
    {parts.map((p: CoursePart) => (
      <Part key={p.name} part={p}/>
    ))}
  </>
  );
};

const Part = ({ part }: {part: CoursePart }) => {
  switch(part.type) {
    case "normal":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p style={{fontStyle: 'italic'}}>{part.description}</p>
        </div>
        );
      break;
    case "groupProject":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
        );
      break;
    case "submission":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p style={{fontStyle: 'italic'}}>{part.description}</p>
          <p>submit to <a href={part.exerciseSubmissionLink}>{part.exerciseSubmissionLink}</a></p>
        </div>
        );
      break;
    case "special":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p style={{fontStyle: 'italic'}}>{part.description}</p>
          <p>required skills: {part.requirements.join(', ')}</p>
        </div>
        );
    default:
      return assertNever(part);
  }
};

const Total = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <p>
      <br></br>
      Number of exercises{" "}
      {parts.reduce((carry: number, part: CoursePart) => carry + part.exerciseCount, 0)}
    </p>
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  return (
    <div>
      <Header name={courseName}/>
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;