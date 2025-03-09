import Course from './components/Course';

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };
  // returns total number of exercises for a course
  const total = (course) => {
    const parts = [...course.parts];
    const partExercises = parts.map(part => part.exercises)

    return partExercises.reduce((accu, curr) => accu + curr);
  }




    console.log('total', total(course))
  return (
    <>
        <Course course={course} />
        <strong>total of {total(course)} exercises</strong>
    </>
  );
};

export default App;
