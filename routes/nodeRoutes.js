// routes/nodeRoutes.js
const express = require('express');
const router = express.Router();

const Node = require('../models/node');

// Get all nodes
router.get('/', async (req, res) => {
  try {
    const nodes = await Node.find();
    res.json(nodes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a node
router.post('/', async (req, res) => {
  const node = new Node({
    text: req.body.text,
    status: req.body.status,
  });

  try {
    const newNode = await node.save();
    res.status(201).json(newNode);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a node
router.patch('/:id', getNode, async (req, res) => {
    if (!res.node) {
      return res.status(404).json({ message: 'Cannot find node' });
    }
  
    if (req.body.text !== undefined) {
      res.node.text = req.body.text;
    }
  
    if (req.body.status !== undefined) {
      res.node.status = req.body.status;
    }
  
    try {
      const updatedNode = await res.node.save();
      res.json(updatedNode);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
// Delete a node
router.delete('/:id', getNode, async (req, res) => {
  try {
    await res.node.remove();
    res.json({ message: 'Deleted node' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function for getting node by ID
async function getNode(req, res, next) {
  let node;

  try {
    node = await Node.findById(req.params.id);

    if (node == null) {
      return res.status(404).json({ message: 'Cannot find node' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.node = node;
  next();
}

module.exports = router;
