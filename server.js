const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Node = require('./models/node');

const app = express();

app.use(cors());
app.use(express.json());
const nodeRoutes = require('./routes/nodeRoutes');  // make sure the path is correct

app.use('/api/node', nodeRoutes);

mongoose.connect('mongodb://localhost:27017/myFlowchartApp', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (error) => console.error('connection error:', error));
db.once('open', () => console.log('Database connected'));

app.listen(5000, () => console.log('Server running on port 5000'));

app.get('/', (req, res) => {
    res.send('Welcome to the API for My Flowchart App');
  });
  