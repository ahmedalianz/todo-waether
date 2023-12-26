import {List} from '@mui/material';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {TODO} from '../store/todosSlice';
import TodoItem from './TodoItem';

export const TodoList = () => {
  const {todos} = useSelector((state: RootState) => state.todosReducer);
  return (
    <List>
      {todos.map((todo: TODO) => (
        <TodoItem key={todo.id} {...{todo}} />
      ))}
    </List>
  );
};
