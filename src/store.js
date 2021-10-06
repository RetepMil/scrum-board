import { configureStore, createSlice } from "@reduxjs/toolkit";

const keys = Object.keys(localStorage);
const initialState = keys.map((id) => {
  return { text: localStorage.getItem(id), id };
});

const toDos = createSlice({
  name: "toDosReducer",
  initialState,
  reducers: {
    add: (state, action) => [
      { text: action.payload.text, id: action.payload.id },
      ...state,
    ],
    remove: (state, action) =>
      state.filter((toDo) => toDo.id !== action.payload),
  },
});

export const { add, remove } = toDos.actions;

export default configureStore({ reducer: toDos.reducer });
