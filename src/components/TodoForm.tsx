import {Button, Grid, TextField} from '@mui/material';
import {FC, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {addTodo, editTodo, TODO} from '../store/todosSlice';

export const TodoForm: FC<{action?: string; todo?: TODO}> = ({
  action = 'add',
  todo,
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(todo?.title || '');
  const [description, setDescription] = useState(todo?.description || '');
  const {theme} = useSelector((state: RootState) => state.themeReducer);

  const handleAddTodo = () => {
    if (title.trim() !== '') {
      if (action === 'add') {
        const newTodo = {
          id: new Date().getTime(),
          title,
          description,
          checked: false,
          createdAt: new Date().toLocaleString(),
          finishedAt: '',
          archiveAt: '',
        };
        dispatch(addTodo(newTodo));
      } else {
        if (todo) {
          const newTodo = {...todo, title, description, editMode: false};
          dispatch(editTodo(newTodo));
        }
      }

      setTitle('');
      setDescription('');
    }
  };

  return (
    <Grid
      container
      spacing={2}
      borderBottom={2}
      borderColor={'black'}
      paddingBottom={3}>
      <Grid item xs={4}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </Grid>
      <Grid item xs={8}>
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={handleAddTodo}
          fullWidth
          sx={{
            backgroundColor: theme === 'light' ? '#2196f3' : '#eee',
            color: theme === 'light' ? '#fff' : 'black',
          }}>
          {action === 'add' ? 'Add ToDo' : 'Edit Todo'}
        </Button>
      </Grid>
    </Grid>
  );
};
