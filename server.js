require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workout');
const userRoutes = require('./routes/user');
const app = express();
const cors = require('cors');
const port = process.env.PORT;

// Middleware
app.use(express.json());

const corsOptions = {
  //production
  // origin: 'https://workout-buddy-frontend-ruddy.vercel.app',
  //development
  origin: 'http://localhost:3000', // replace with your actual frontend URL
  credentials: true, // if you use cookies or sessions
};

app.use(cors(corsOptions));

//logging middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// Test route for debugging
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Backend is working!' });
});

// Sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});


//connect to db then run server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });     
  })
  .catch((error) => {
    console.log(error)
  })







