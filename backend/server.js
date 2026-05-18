
const express = require('express');
const cors = require('cors');

const meetingRoutes = require('./routes/meetingRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', meetingRoutes);

app.get('/', (req, res) => {
  res.send('Backend running');
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
