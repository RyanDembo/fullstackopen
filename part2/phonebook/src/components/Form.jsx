const Form = (props) => {
  const { onSubmit, newName, onChangeName, newNumber, onChangeNumber } = props;


  return (
    <form onSubmit={onSubmit}>
    <div>
      name:{" "}
      <input
        value={newName}
        onChange={onChangeName}
        required
      />
    </div>
    <div>
      number:{" "}
      <input
        type="tel"
        value={newNumber}
        onChange={onChangeNumber}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

  )
};

export default Form;
