import React from "react";

// Topbar component with save button
const Topbar = ({ saveFlow }) => (
  // Topbar container with save button
  <div className="savingChange">
    {/* Save Changes button */}
    <button onClick={saveFlow}>Save Changes</button>
  </div>
);

export default Topbar;
