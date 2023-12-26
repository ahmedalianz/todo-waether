import Brightness4Icon from '@mui/icons-material/Brightness4';
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import './App.css';
import {TodoForm, TodoList, Weather} from './components';
import {RootState} from './store';
import {toggleTheme} from './store/themeSlice';
function App() {
  const {theme} = useSelector((state: RootState) => state.themeReducer);

  const dispatch = useDispatch();
  const handleDarkModeToggle = () => {
    dispatch(toggleTheme());
  };
  return (
    <Box>
      <CssBaseline />
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: theme === 'light' ? '#2196f3' : '#eee',

          color: theme === 'light' ? '#fff' : 'black',
        }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            UNIFI SOLUTIONS ToDo
          </Typography>
          <IconButton color="inherit" onClick={handleDarkModeToggle}>
            <Brightness4Icon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Weather />
      <Container component="main" maxWidth="md" sx={{marginTop: 2}}>
        <Paper elevation={3} sx={{padding: 2}}>
          <TodoForm />
          <TodoList />
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
