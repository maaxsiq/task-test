import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

import { api } from "../api/api";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import type { Task } from "../types/task";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const { logout } = useAuth();
  const navigate = useNavigate();

  async function loadTasks() {
    const response = await api.get<Task[]>("/tasks");
    setTasks(response.data);
  }

  async function handleCreateTask(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    await api.post("/tasks", { title, description });
    setTitle("");
    setDescription("");
    loadTasks();
  }

  async function handleToggle(task: Task) {
    await api.patch(`/tasks/${task.id}/toggle`);
    loadTasks();
  }

  function handleDelete(taskId: string) {
    setTaskToDelete(taskId);
  }

  async function confirmDelete() {
    if (!taskToDelete) return;

    await api.delete(`/tasks/${taskToDelete}`);
    setTaskToDelete(null);
    loadTasks();
  }

  function cancelDelete() {
    setTaskToDelete(null);
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function startEdit(task: Task) {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description ?? "");
  }

  async function handleUpdate(taskId: string) {
    if (!editTitle.trim()) return;

    await api.put(`/tasks/${taskId}`, {
      title: editTitle,
      description: editDescription,
    });

    setEditingTaskId(null);
    loadTasks();
  }

  function cancelEdit() {
    setEditingTaskId(null);
  }

  useEffect(() => {
    async function fetchTasks() {
      const response = await api.get<Task[]>("/tasks");
      setTasks(response.data);
    }

    fetchTasks();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box minHeight="100vh" py={4}>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Typography variant="h4">Minhas tarefas</Typography>

          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Sair
          </Button>
        </Stack>

        <Box component="form" onSubmit={handleCreateTask} mb={3}>
          <Stack spacing={2}>
            <TextField
              label="Título"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              label="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button type="submit" variant="contained">
              Criar tarefa
            </Button>
          </Stack>
        </Box>

        <List>
          {tasks.map((task) => (
            <ListItem key={task.id} divider alignItems="flex-start">
              <Checkbox
                checked={task.completed}
                onChange={() => handleToggle(task)}
              />

              {editingTaskId === task.id ? (
                <Stack
                  flex={1}
                  direction="column"
                  spacing={1}
                  alignItems="center"
                  marginRight={8}
                >
                  <TextField
                    size="small"
                    fullWidth
                    label="Título"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />

                  <TextField
                    size="small"
                    fullWidth
                    label="Descrição"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                </Stack>
              ) : (
                <ListItemText
                  primary={task.title}
                  secondary={task.description}
                  sx={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                />
              )}

              <ListItemSecondaryAction>
                {editingTaskId === task.id ? (
                  <Stack direction="row">
                    <IconButton
                      color="primary"
                      onClick={() => handleUpdate(task.id)}
                    >
                      <SaveIcon color="info" />
                    </IconButton>

                    <IconButton onClick={cancelEdit}>
                      <CancelIcon color="error" />
                    </IconButton>
                  </Stack>
                ) : (
                  <Stack direction="row">
                    <IconButton onClick={() => startEdit(task)}>
                      <EditIcon color="info" />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => handleDelete(task.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
      <Dialog open={!!taskToDelete} onClose={cancelDelete}>
        <DialogTitle>Excluir tarefa</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir esta tarefa? Essa ação não pode ser
            desfeita.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={cancelDelete}>Cancelar</Button>
          <Button color="error" onClick={confirmDelete}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
