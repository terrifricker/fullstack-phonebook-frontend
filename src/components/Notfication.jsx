const Notification = ({ successMessage, errorMessage }) => {

  const successStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px"
  }
  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px"
  }

  if (successMessage === null && errorMessage === null) {
    return null
  }
  if (successMessage) {
    return (
      <div style={successStyle}>
        {successMessage}
      </div>
    )
  }
  if (errorMessage) {
    return (
      <div style={errorStyle}>
        {errorMessage}
      </div>
    )
  }
}

export default Notification