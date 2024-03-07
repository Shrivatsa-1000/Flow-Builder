import React, { useState, useEffect } from "react";

const UpdateNode = ({ selectedNode, setNodeSelected, setNodes, setEdges }) => {
  // State to hold the name of the node
  const [nodeName, setNodeName] = useState(selectedNode.data.label);

  // Effect to update the node name when the selected node label changes
  useEffect(() => {
    setNodeName(selectedNode.data.label);
  }, [selectedNode.data.label]);

  // Effect to update the nodes array when the node name or ID changes
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, label: nodeName } }
          : node
      )
    );
  }, [selectedNode.id, nodeName, setNodes]);

  // Function to handle going back to the main sidebar
  const mainSidebar = () => {
    setNodeSelected(false);
  };

  // Function to handle node deletion
  // const deleteNode = () => {
  //   setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
  //   setNodeSelected(false); // Close the update node sidebar after deletion
  // };
  // Function to handle node deletion
  const deleteNode = () => {
    // Filter out the deleted node
    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));

    // Remove related edges when deleting a node
    setEdges((prevEdges) =>
      prevEdges.filter(
        (edge) =>
          edge.source !== selectedNode.id && edge.target !== selectedNode.id
      )
    );

    // Close the update node sidebar after deletion
    setNodeSelected(false);
  };

  return (
    <>
      {/* Update node header */}
      <div className="update">
        <div
          className="back"
          onClick={mainSidebar}
          style={{ cursor: "pointer" }}
        >
          {/* Back button */}
          <img src="back.svg" alt="back icon" height={15} />
          {/* Header text */}
          <h2 style={{ paddingLeft: 10, margin: 0 }}>Message</h2>
        </div>
      </div>
      {/* Divider */}
      <div style={{ width: "100%", height: 2, background: "grey" }}></div>

      {/* Update node content */}
      <div className="update">
        {/* Label for text area */}
        <h3>Text:</h3>
        {/* Text area for editing node label */}
        <textarea
          rows="4"
          cols="25"
          value={nodeName}
          onChange={(evt) => setNodeName(evt.target.value)}
          style={{ marginBottom: 15, borderRadius: 5 }}
        />
        {/* Delete node button */}
        <button onClick={deleteNode}>Delete Node</button>
      </div>
      {/* Divider */}
      <div style={{ width: "100%", height: 2, background: "grey" }}></div>
    </>
  );
};

export default UpdateNode;
