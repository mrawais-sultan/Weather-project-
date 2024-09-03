const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/Task'); // Import the Task model

const app = express();
app.use(express.json());

// Route to get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// Route to add a new task
app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error adding task' });
  }
});

// Route to delete a task by ID
// app.delete('/api/tasks/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Task.findByIdAndDelete(id);
//     res.json({ message: 'Task deleted' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting task' });
//   }
// });

// Route to delete a task by ID
app.delete('/api/tasks/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTask = await Task.findByIdAndDelete(id);
      if (deletedTask) {
        res.json({ message: 'Task deleted' });
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting task' });
    }
  });
  



// Route to update a task's completion status
app.patch('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, { completed }, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
