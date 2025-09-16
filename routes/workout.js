const express = require('express');
const router = express.Router();
const { createWorkout,
        getWorkout,
        getWorkouts,
        deleteWorkout,
        updateWorkout 
      } = require('../controllers/workoutController');
      const requireAuth = require('../middleware/requireAuth');

// Require auth for all workout routes
router.use(requireAuth);

// GET all workouts
router.get('/', getWorkouts);

// GET a single workout by id
router.get('/:id', getWorkout);

// POST a new workout
router.post('/', createWorkout);

// DELETE a workout by id
router.delete('/:id', deleteWorkout);

// PATCH (update) a workout by id
router.patch('/:id', updateWorkout);

module.exports = router;
