const ShowBtn = ({onClick, id}) => {
    return (
        <button onClick={ (e) => onClick(id)}>{" "}show</button>
    )
}
export default ShowBtn;