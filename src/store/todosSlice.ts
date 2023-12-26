import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
export interface TODO {
  id: number;
  title: string;
  description: string;
  checked: boolean;
  createdAt: string;
  finishedAt: string;
  archiveAt: string;
  editMode?: boolean;
}
export type TodosState = Array<TODO>;

const initialState: TodosState = loadFromLocalStorage() || [];
function loadFromLocalStorage(): TodosState | null {
  const storedData = localStorage.getItem('todos');
  return storedData ? JSON.parse(storedData) : null;
}

function saveToLocalStorage(data: TodosState) {
  localStorage.setItem('todos', JSON.stringify(data));
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: initialState,
  },
  reducers: {
    addTodo: (state, action: PayloadAction<TODO>) => {
      state.todos.push(action.payload);
      saveToLocalStorage(state.todos);
    },
    editTodo: (state, action: PayloadAction<TODO>) => {
      const todoToBeEdited = state.todos.find(
        todo => todo.id === action.payload.id,
      );
      if (todoToBeEdited) {
        state.todos = state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo,
        );
        saveToLocalStorage(state.todos);
      }
      saveToLocalStorage(state.todos);
    },
    removeTodo: (state, action: PayloadAction<TODO['id']>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      saveToLocalStorage(state.todos);
    },
    toggleEditMode: (
      state,
      action: PayloadAction<{id: TODO['id']; mode: boolean}>,
    ) => {
      const todoToBeInEditMode = state.todos.find(
        todo => todo.id === action.payload.id,
      );
      if (todoToBeInEditMode) {
        state.todos = state.todos.map(todo =>
          todo.id === action.payload.id
            ? {...todo, editMode: action.payload.mode}
            : todo,
        );
        saveToLocalStorage(state.todos);
      }
    },
    archiveTodo: (state, action: PayloadAction<TODO['id']>) => {
      const todoToBeArchived = state.todos.find(
        todo => todo.id === action.payload,
      );
      if (todoToBeArchived) {
        state.todos = state.todos.map(todo =>
          todo.id === action.payload
            ? {...todo, archiveAt: new Date().toLocaleString()}
            : todo,
        );
        saveToLocalStorage(state.todos);
      }
    },
    checkTodo: (state, action: PayloadAction<TODO['id']>) => {
      const todoToBeChecked = state.todos.find(
        todo => todo.id === action.payload,
      );
      if (todoToBeChecked) {
        state.todos = state.todos.map(todo =>
          todo.id === action.payload
            ? {
                ...todo,
                checked: !todo.checked, //toggle to do
                finishedAt: todo.checked ? '' : new Date().toLocaleString(), // set date if finished and reset if un checked
              }
            : todo,
        );
        saveToLocalStorage(state.todos);
      }
    },
  },
});

export const {
  addTodo,
  editTodo,
  removeTodo,
  archiveTodo,
  checkTodo,
  toggleEditMode,
} = todosSlice.actions;

export default todosSlice.reducer;
