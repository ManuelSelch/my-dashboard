const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const homeRoutes = require('./routes/home');
const uploadsRoutes = require('./routes/uploads');
const projectsRoutes = require('./routes/projects');

const app = express();
const PORT = 5001;


app.use(cors({
  origin: ['https://dashboard.dev.manuelselch.de', 'http://localhost:30001', 'http://localhost:3000']
}));
app.use(bodyParser.json());

app.use('/home', homeRoutes);
app.use('/uploads', uploadsRoutes);
app.use('/projects', projectsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
