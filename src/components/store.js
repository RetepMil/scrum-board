import { configureStore, createSlice } from "@reduxjs/toolkit";

let initialState = [
  { text: "Finish html css js", id: parseInt(Date.now), type: "todo" },
];

const toDos = createSlice({
  name: "toDosReducer",
  initialState,
  reducers: {
    add: (state, action) => [
      {
        text: action.payload.text,
        id: action.payload.id,
        type: action.payload.type,
      },
      ...state,
    ],
    remove: (state, action) =>
      state.filter((toDo) => toDo.id !== action.payload),
    changeText: (state, action) =>
      state.map((i) =>
        i.id === action.id ? { text: action.text, id: i.id, type: i.type } : i
      ),
    changeType: (state, action) =>
      state.map((i) =>
        i.id === action.id ? { text: i.text, id: i.id, type: action.type } : i
      ),
  },
});

export const { add, remove, changeType, changeText } = toDos.actions;

export default configureStore({ reducer: toDos.reducer });
