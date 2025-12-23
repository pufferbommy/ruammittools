"use client";

import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Node,
  ReactFlow,
} from "@xyflow/react";
import { Input } from "@/components/ui/input";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";

const initialNodes: Node[] = [
  {
    id: "n1",
    position: { x: 0, y: 0 },
    data: {
      label: "YouTube Metadata Extractor",
    },
  },
  {
    id: "n2",
    position: { x: 0, y: 100 },
    data: {
      label: <Input placeholder="URL" />,
    },
  },
  {
    id: "n3",
    position: { x: 0, y: 200 },
    data: {
      label: <>?asdad</>,
    },
  },
];

const initialEdges = [
  { id: "n1-n2", source: "n1", target: "n2" },
  { id: "n2-n3", source: "n2", target: "n3" },
];

export default function Home() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  return (
    <div className="h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
    </div>
  );
}
