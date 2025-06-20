const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  //props an array of parts (items)
  console.log(props);
  return (
    <div>
      {props.parts.map((item) => (
        <Part part={item} />
      ))}
    </div>
  );
};

const Part = (props) => {
  console.table(props);
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Total = (props) => {
  const sum = props.parts.reduce((accum, currentVal) => {
    return accum + currentVal.exercises;
  }, 0);

  console.log(props);
  return <p>Number of exercises {sum}</p>;
};

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
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
