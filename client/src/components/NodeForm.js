// client/src/components/NodeForm.js
import React, { useState } from 'react';

function NodeForm({ addNode }) {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('TODO');

  const onSubmit = (e) => {
    e.preventDefault();
    addNode({ text, status });
    setText('');
    setStatus('TODO');
  };

  return (
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
      <button className="addButton">+</button>
    </form>
  );
}

export default NodeForm;
