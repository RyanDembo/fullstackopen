import Course from './components/Course';

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ];
  // returns total number of exercises for a course
  const total = (course) => {
    const parts = [...course.parts];
    const partExercises = parts.map(part => part.exercises)

    return partExercises.reduce((accu, curr) => accu + curr);
  }

const renderCourses = (courses) => {
  return courses.map((course) => 
    <div key={course.id}>
      <Course course = {course} />
      <strong>total of {total(course)} exercises</strong>
    </div>
  );
}

  return (
    renderCourses(courses)
  );
};

export default App;
