"use client";

import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Node,
  ReactFlow,
} from "@xyflow/react";
import { Button } from "@/components/ui/button";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";

const initialNodes: Node[] = [
  {
    id: "n1",
    position: { x: 0, y: 0 },
    data: { label: "คอนเทนต์" },
  },
  {
    id: "n2",
    position: { x: 0, y: 100 },
    data: { label: "YouTube Metadata Extractor" },
  },
];
const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];

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
      <div className="fixed right-2 top-2">
        <Button disabled>Create Own Tool</Button>
      </div>
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
