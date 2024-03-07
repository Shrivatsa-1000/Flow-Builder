import React from "react";
import { Handle, Position } from "reactflow";

// Custom node component for ReactFlow diagram
const Node = ({ data }) => {
  return (
    <div>
      {/* Header section */}
      <div style={styles.header}>
        {/* Left side of header */}
        <div style={styles.leftHeader}>
          <span style={styles.icon}>
            <img src="chat.svg" alt="chat icon" height={15} /> {/* Chat icon */}
          </span>
          {/* Heading */}
          {data.heading}
        </div>
        {/* Right side of header */}
        <div style={styles.rightHeader}>
          <img src="whatsapp.svg" alt="whatsapp icon" height={15} />{" "}
          {/* WhatsApp icon */}
        </div>
      </div>
      {/* Body section */}
      <div style={styles.body}>
        {/* Label */}
        <div style={styles.label}>{data.label}</div>
      </div>
      {/* Handles for connecting edges */}
      <Handle type="source" position={Position.Right} id="source" />{" "}
      {/* Source handle */}
      <Handle type="target" position={Position.Left} id="target" />{" "}
      {/* Target handle */}
    </div>
  );
};

// Styles for the Node component
const styles = {
  header: {
    backgroundColor: "rgb(154, 255, 245)", // Header background color
    borderTopLeftRadius: 5, // Rounded corners
    borderTopRightRadius: 5, // Rounded corners
    fontWeight: "bold", // Bold text
    color: "black", // Text color
    paddingLeft: 15, // Left padding
    paddingTop: 3, // Top padding
    paddingBottom: 3, // Bottom padding
    display: "flex", // Flex layout
    alignItems: "center", // Vertical alignment
    justifyContent: "space-between", // Space between items
    width: 275, // Width
  },
  leftHeader: {
    display: "flex", // Flex layout
    alignItems: "center", // Vertical alignment
  },
  icon: {
    fontSize: 13, // Font size
    paddingTop: 5, // Top padding
    paddingRight: 15, // Right padding
  },
  rightHeader: {
    paddingRight: 15, // Right padding
  },
  body: {
    padding: 15, // Padding
    borderBottomLeftRadius: 5, // Rounded corners
    borderBottomRightRadius: 5, // Rounded corners
    backgroundColor: "white", // Background color
  },
  label: {
    color: "black", // Text color
  },
};

export default Node;
