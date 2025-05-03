const Notification = ({message}) => {

    console.log(message);
    
    if (Object.keys(message).length === 0) return null;

    const cssStyle = message.isError ? "error" : "success";
    return (
        <div className={cssStyle}>
          {message.text}
        </div>
      )
}

export default Notification;