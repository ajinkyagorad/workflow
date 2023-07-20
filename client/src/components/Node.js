// client/src/components/Node.js
import React, { useState } from 'react';
import './Node.css';

function Node(props) {
  const node = props.node;
  const updateNode = props.updateNode;
  const deleteNode = props.deleteNode;

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(node.text);
  const [status, setStatus] = useState(node.status);

  const onSubmit = (e) => {
    e.preventDefault();
    updateNode(node.id, { text, status });
    setIsEditing(false);
  };

  return (
    <div className={`node ${status.toLowerCase().replace(" ", "-")}`}>
      {isEditing ? (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="TODO">TODO</option>
            <option value="IN PROGRESS">IN PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
          <button type="submit">Update Node</button>
        </form>
      ) : (
        <div className="node-display">
          <h3>{node.text}</h3>
          <p>{node.status}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteNode(node._id)}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default Node;
