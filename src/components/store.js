import { configureStore, createSlice } from "@reduxjs/toolkit";
import { dbService } from "../fbase";

const getTasksData = async () => {
  const snapshot = await dbService.collection("tasks").get();
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
};

const items = createSlice({
  name: "itemsReducer",
  initialState: [],
  reducers: {
    add: (state, action) => [
      {
        id: action.payload.id,
        text: action.payload.text,
        type: action.payload.type,
      },
      ...state,
    ],
    remove: (state, action) =>
      state.filter((item) => item.id !== action.payload),
    edit: (state, action) => {
      return state.map((i) =>
        i.id === action.payload.id
          ? {
              id: i.id,
              text: action.payload.text,
              type: action.payload.type,
            }
          : i
      );
    },
  },
});

const store = configureStore({ reducer: items.reducer });

getTasksData().then((res) => {
  res.map((task) => store.dispatch(add(task)));
});

export const { add, remove, edit } = items.actions;

export default store;
