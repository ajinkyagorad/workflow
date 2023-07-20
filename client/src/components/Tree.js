// client/src/components/Tree.js
import React from 'react';
import SortableTree from 'react-sortable-tree';

function Tree({ nodes, addNode, updateNode, deleteNode }) {
  const handleChange = (newTree) => {
    // This will convert the tree structure back to your flat structure
    const updatedNodes = newTree.reduce((acc, node) => {
      return [...acc, { id: node.id, text: node.title, status: node.subtitle }];
    }, []);

    // You might want to send these updated nodes to your API to update your database
    // I'll leave this up to you to implement, depending on the requirements of your app
    // For now, I'll just update the local state
    setNodes(updatedNodes);
  };

  // The react-sortable-tree component expects data in a different structure
  // So we need to convert your nodes to this structure
  const treeData = nodes.map(node => ({ id: node.id, title: node.text, subtitle: node.status }));

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <SortableTree
        treeData={treeData}
        onChange={handleChange}
        generateNodeProps={({ node }) => ({
          buttons: [
            <button onClick={() => deleteNode(node.id)}>Delete</button>
          ]
        })}
      />
    </div>
  );
}

export default Tree;
