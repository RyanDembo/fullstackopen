const Number = ({ person, handleDelete }) => {
  return (
    <>
      <div style={{padding: '.2em .2em'}}>
        {person.name} {person.number}
        <button style={{marginLeft: '2em'}} onClick={(event) => handleDelete(person)}>Delete Number</button>
      </div>
      
    </>
  );
};
export default Number;
