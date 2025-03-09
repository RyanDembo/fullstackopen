const Course = ({ course }) => {
  const { id, name, parts } = course;

  return (
    <>
      <h1>{name}</h1>
      {parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
    </>
  );
};

export default Course;
