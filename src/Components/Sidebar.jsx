import { useEffect, useState } from "react";

// Sidebar component
const Sidebar = () => {
  // State to show helpful chat flow usage info
  const [showUsage, setShowUsage] = useState(true);

  // Tell drag & drop usage of nodes to user on first load of the application
  useEffect(() => {
    setTimeout(() => {
      setShowUsage(false);
    }, 5000);
  }, [showUsage]);

  // Function triggered when dragging starts
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  // JSX for Sidebar component
  return (
    <>
      <aside>
        <div
          className="appnode"
          onDragStart={(event) => onDragStart(event, "default")}
          draggable
          style={{ margin: "auto" }} // Center horizontally
        >
          <span className="material-symbols-outlined">
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ paddingRight: 10, color: "white" }}>
                <img src="message.svg" alt="message icon" height={25} />
              </div>
            </div>
          </span>
          Message
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
