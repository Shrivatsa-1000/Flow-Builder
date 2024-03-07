import { useState, useRef, useCallback, useMemo } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "./Components/Sidebar";
import UpdateNode from "./Components/UpdateNode";
import Notification from "./Components/Notification";
import Topbar from "./Components/Topbar";
import newNode from "./Components/NewNode";
import "./App.css";

// Define a unique ID counter
let id = 0;

function App() {
  // Refs and state variables
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodeSelected, setNodeSelected] = useState(false);
  const [changeNode, setChangeNode] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [messageColor, setMessageColor] = useState(null);
  const [targetHandles, setTargetHandles] = useState([]);

  // Function to handle node selection
  const update = useCallback((event, node) => {
    setChangeNode(node);
    setNodeSelected(true);
  }, []);

  // Function to handle edge creation
  const onConnect = useCallback(
    (params) => {
      // Initialize sourceHandles inside the useCallback callback
      const sourceHandles = [];

      // Check if source handle already exists
      if (sourceHandles.includes(params.source)) return;

      // Add source handle to the array
      sourceHandles.push(params.source);

      // Add edge to the graph
      setEdges((eds) =>
        addEdge({ ...params, markerEnd: { type: "arrowclosed" } }, eds)
      );

      // Check if target handle already exists
      if (targetHandles.includes(params.target)) return;
      // Add target handle to the array
      setTargetHandles((handles) => [...handles, params.target]);
    },
    [setEdges, targetHandles]
  );

  // Function to handle drag over
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Function to handle drop
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newerNode = {
        id: `node_${id++}`,
        type: "node",
        position,
        data: { heading: "Send Message", label: `Text Message ${id}` },
      };

      // Add the new node to the list of nodes
      setNodes((nds) => [...nds, newerNode]);
    },
    [reactFlowInstance, setNodes]
  );

  // Function to save flow
  const saveFlow = () => {
    const totalNodes = nodes.length;

    // Get unique sources and targets from edges
    const uniqueSources = new Set(edges.map((edge) => edge.source));
    const uniqueTargets = new Set(edges.map((edge) => edge.target));

    // Check if all nodes have incoming and outgoing edges
    const nodesWithEdges = new Set([...uniqueSources, ...uniqueTargets]);

    if (nodesWithEdges.size !== totalNodes && totalNodes !== 1) {
      // Show error message if not all nodes have incoming and outgoing edges
      showError("Cannot save Flow", "error");
    } else {
      // Show success message if all nodes have incoming and outgoing edges
      showError("Saved Flow", "success");
    }
  };

  // Function to show error message
  const showError = (message, color) => {
    setErrorMessage(message);
    setMessageColor(color);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  // Options to hide attribution
  let proOptions = { hideAttribution: true };

  // Custom node types
  const nodeTypes = useMemo(() => ({ node: newNode }), []);

  return (
    <div className="appflow" style={{ width: "100vw", height: "100vh" }}>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <div className="topbar">
            <Notification
              errorMessage={errorMessage}
              messageColor={messageColor}
            />
          </div>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            proOptions={proOptions}
            onNodeClick={update}
            nodeTypes={nodeTypes}
          >
            <Controls />
          </ReactFlow>
        </div>
        <div className="rightbar">
          <Topbar saveFlow={saveFlow} />
          {nodeSelected ? (
            <UpdateNode
              selectedNode={changeNode}
              setNodeSelected={setNodeSelected}
              setNodes={setNodes}
              setEdges={setEdges}
            />
          ) : (
            <Sidebar />
          )}
        </div>
      </ReactFlowProvider>
    </div>
  );
}

export default App;
