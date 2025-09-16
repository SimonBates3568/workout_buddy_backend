const workout = require('../models/workoutModel');
const mongoose = require('mongoose')

//GET all workouts in desc order
const getWorkouts = async (req,res) => {
    const user_id = req.user._id
    const workouts = await workout.find({ user_id }).sort({createdAt: -1})
    res.status(200).json(workouts)
}

//GET single workout by id
const getWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const singleWorkout = await workout.findById(id)

    if(!singleWorkout) {
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(singleWorkout)

}

//CREATE new workout
const createWorkout = async (req, res) => {
    const { title, reps, load, notes } = req.body;

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    // notes is optional, so no validation here
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    //add doc to db
    try {
        const user_id = req.user._id
        const newWorkout = await workout.create({
            title,
            load,
            reps,
            user_id,
            notes: notes || ''
        })
        res.status(200).json(newWorkout)
    } catch (error){
        res.status(400).json({error: error.message})
    }
};

//DELETE a workout by id
const deleteWorkout = async (req,res) => {
       const { id } = req.params

         if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
         }
 
        const deletedWorkout = await workout.findOneAndDelete({
            _id: id
        })

        if(!deletedWorkout) {
        return res.status(404).json({error: 'No such workout'})
        }
        res.status(200).json(deletedWorkout)
              
}

//UPDATE a workout by id
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }

    // Only allow updating allowed fields
    const { title, reps, load, notes } = req.body;
    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (reps !== undefined) updateFields.reps = reps;
    if (load !== undefined) updateFields.load = load;
    if (notes !== undefined) updateFields.notes = notes;

    const updatedWorkout = await workout.findOneAndUpdate(
        { _id: id },
        updateFields,
        { new: true }
    );

    if (!updatedWorkout) {
        return res.status(404).json({ error: 'No such workout' });
    }
    res.status(200).json(updatedWorkout);
};


module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
};












