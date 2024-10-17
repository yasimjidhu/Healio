const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const patientRoutes = require('./routes/patientRoutes');
const authorizationRoutes = require('./routes/authorizationRoutes')
const dotenv = require('dotenv');
const { connect } = require('mongoose');
const connectDB = require('./config/db');
dotenv.config()


const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

// routes
app.use('/api/users', userRoutes); 
app.use('/api/patients', patientRoutes);
app.use('/api/prior-authorizations', authorizationRoutes);

connectDB()
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
