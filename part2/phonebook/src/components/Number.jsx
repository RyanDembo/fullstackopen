const Number = ({ person, handleDelete }) => {
  return (
    <>
      <div style={{padding: '.2em .2em'}}>
        {person.name} {person.number}
        <button style={{marginLeft: '1em'}} onClick={(event) => handleDelete(person)}>Delete</button>
      </div>
      
    </>
  );
};
export default Number;
