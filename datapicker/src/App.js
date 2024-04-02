import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DoneIcon from '@mui/icons-material/Done';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  addTaskContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginRight: theme.spacing(8),
  },
}));

function App() {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEditingTask = (taskId, taskText) => {
    setEditingTaskId(taskId);
    setEditedTaskText(taskText);
  };

  const saveEditedTask = () => {
    setTasks(tasks.map(task =>
      task.id === editingTaskId ? { ...task, text: editedTaskText } : task
    ));
    setEditingTaskId(null);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <div className="App">
        <Typography variant="h4" color="primary">Todo List</Typography>
        <br/>
        <Box className={classes.addTaskContainer} sx={{ gap: '16px' }}>
          <TextField
            className={classes.textField}
            label="Add a new task"
            variant="outlined"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button variant="contained" onClick={addTask}>Add</Button>
        </Box>
        <List>
          {tasks.map(task => (
            <ListItem key={task.id} className={task.completed ? 'completed' : ''}>
              {editingTaskId === task.id ? (
                <>
                  <TextField
                    label="Edit task"
                    variant="outlined"
                    value={editedTaskText}
                    onChange={(e) => setEditedTaskText(e.target.value)}
                  />
                  <IconButton onClick={saveEditedTask}><SaveIcon /></IconButton>
                </>
              ) : (
                <>
                  <ListItemText
                    primary={task.text}
                    onClick={() => toggleTaskCompletion(task.id)}
                    style={{ cursor: 'pointer' }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => startEditingTask(task.id, task.text)}><EditIcon /></IconButton>
                    <IconButton onClick={() => deleteTask(task.id)}><DeleteIcon /></IconButton>
                    {!task.completed && (
                      <IconButton onClick={() => toggleTaskCompletion(task.id)}><DoneIcon /></IconButton>
                    )}
                  </ListItemSecondaryAction>
                </>
              )}
            </ListItem>
          ))}
        </List>
        <Typography variant="h4" color="green">Completed Tasks</Typography>
        <List>
          {tasks.filter(task => task.completed).map(task => (
            <ListItem key={task.id} className="completed">
              <ListItemText primary={task.text} />
            </ListItem>
          ))}
        </List>
      </div>
    </Box>
  );
}

export default App;
