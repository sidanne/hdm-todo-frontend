import { Check, Delete } from '@mui/icons-material';
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editedTasks, setEditedTasks] = useState<Record<number, string>>({});
  const [newTaskName, setNewTaskName] = useState('');

  const handleFetchTasks = async () => {
    const result = await api.get('/tasks');
    setTasks(result);
    setEditedTasks({});
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    await handleFetchTasks();
  };

  const handleSave = async (id: number) => {
    const name = editedTasks[id];
    if (!name || name.trim() === '') return;

    await api.patch(`/tasks/${id}`, { name });
    await handleFetchTasks();
  };

  const handleCreate = async () => {
    if (newTaskName.trim() === '') return;
    await api.post('/tasks', { name: newTaskName });
    setNewTaskName('');
    await handleFetchTasks();
  };

  const hasChanged = (task: Task) =>
    editedTasks[task.id] !== undefined && editedTasks[task.id] !== task.name;

  useEffect(() => {
    handleFetchTasks();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        {tasks.map((task) => (
          <Box key={task.id} display="flex" justifyContent="center" alignItems="center" mt={2} gap={1} width="100%">
            <TextField
              size="small"
              value={editedTasks[task.id] ?? task.name}
              onChange={(e) =>
                setEditedTasks((prev) => ({ ...prev, [task.id]: e.target.value }))
              }
              fullWidth
              sx={{ maxWidth: 350 }}
            />
            <Box>
              <IconButton
                color="success"
                disabled={!hasChanged(task)}
                onClick={() => handleSave(task.id)}
              >
                <Check />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(task.id)}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ))}

        <Box display="flex" justifyContent="center" alignItems="center" mt={4} gap={1}>
          <TextField
            size="small"
            placeholder="Nouvelle tâche"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            sx={{ maxWidth: 350 }}
          />
          <Button variant="outlined" onClick={handleCreate}>
            Ajouter une tâche
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TodoPage;
