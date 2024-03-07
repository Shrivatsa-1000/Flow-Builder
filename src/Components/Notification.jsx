// Notification component displaying error or success message based on props
const Notification = ({ errorMessage, messageColor }) => {
  return (
    // Conditional rendering based on errorMessage
    <div
      className={errorMessage ? messageColor : "savingChanges"} // Apply messageColor if errorMessage exists, else apply "savingChanges" class
      style={{ padding: errorMessage ? 0 : 19 }} // Remove padding if errorMessage exists, else apply default padding
    >
      {errorMessage} {/* Display errorMessage */}
    </div>
  );
};

export default Notification;
