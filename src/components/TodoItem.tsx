import ArchiveIcon from '@mui/icons-material/Archive';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';

import {
  Box,
  Checkbox,
  Dialog,
  DialogContent,
  IconButton,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import {FC, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  archiveTodo,
  checkTodo,
  removeTodo,
  TODO,
  toggleEditMode,
} from '../store/todosSlice';
import {TodoForm} from './TodoForm';
const TodoItem: FC<{todo: TODO}> = ({todo}) => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  const toggleDialog = () => {
    setOpenDialog(prev => !prev);
  };

  const handleCheckToggle = (id: number) => {
    dispatch(checkTodo(id));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(removeTodo(id));
  };

  const handleArchiveTodo = (id: number) => {
    dispatch(archiveTodo(id));
  };
  const handleEditTodo = (id: number, mode: boolean) => {
    dispatch(toggleEditMode({id, mode}));
  };
  return (
    <>
      <ListItem>
        {todo.editMode ? (
          <TodoForm action="edit" {...{todo}} />
        ) : (
          <>
            <Checkbox
              edge="start"
              checked={todo.checked}
              onChange={() => handleCheckToggle(todo.id)}
            />
            <ListItemText primary={todo.title} secondary={todo.createdAt} />
          </>
        )}
        {todo.editMode ? (
          <IconButton onClick={() => handleEditTodo(todo.id, false)}>
            <CloseIcon />
          </IconButton>
        ) : (
          <Box>
            <IconButton onClick={() => handleArchiveTodo(todo.id)}>
              <ArchiveIcon />
            </IconButton>
            <IconButton onClick={() => handleEditTodo(todo.id, true)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={toggleDialog}>
              <InfoIcon />
            </IconButton>

            <IconButton onClick={() => handleDeleteTodo(todo.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </ListItem>
      <Dialog open={openDialog} onClose={toggleDialog}>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>{todo.title}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>{todo.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>CreatedAt</TableCell>
                  <TableCell>{todo.createdAt}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Finished At</TableCell>
                  <TableCell>{todo.finishedAt || 'Not Yet Finished'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default TodoItem;
