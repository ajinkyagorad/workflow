// client/src/App.js
import './App.css';

import React, { useState, useEffect } from 'react';
import Node from './components/Node';
import NodeForm from './components/NodeForm';
import axios from 'axios';

function App() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/node')
      .then(response => setNodes(response.data))
      .catch(error => console.error(error));
  }, []);

  const addNode = (node) => {
    axios.post('http://localhost:5000/api/node', node)
      .then(response => setNodes(prevNodes => [...prevNodes, response.data]))
      .catch(error => console.error(error));
  };

  const updateNode = (id, updatedNode) => {
    axios.patch(`http://localhost:5000/api/node/${id}`, updatedNode)
      .then(response => {
        setNodes(nodes.map(node => node.id === id ? response.data : node));
      })
      .catch(error => console.error(error));
  };

  const deleteNode = (id) => {
    axios.delete(`http://localhost:5000/api/node/${id}`)
      .then(response => {
        setNodes(nodes.filter(node => node.id !== id));
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="App">
      <div>
        <h1>Workflow</h1>
        <NodeForm addNode={addNode} />
      </div>
      <div className="node-list">
        {nodes.map(node => (
          <Node key={node.id} node={node} updateNode={updateNode} deleteNode={deleteNode} />
        ))}
      </div>
    </div>
  );
}

export default App;
