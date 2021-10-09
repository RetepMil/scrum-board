import { configureStore, createSlice } from "@reduxjs/toolkit";
import { dbService } from "../fbase";

let initialState = dbService.collection("jjiks").onSnapshot();

const items = createSlice({
  name: "itemsReducer",
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
      state.filter((item) => item.id !== action.payload),
    edit: (state, action) =>
      state.map((i) =>
        i.id === action.payload.id
          ? { text: action.payload.text, id: i.id, type: action.payload.type }
          : i
      ),
  },
});

export const { add, remove, edit } = items.actions;

export default configureStore({ reducer: items.reducer });
