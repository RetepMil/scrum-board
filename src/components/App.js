import { Provider } from "react-redux";
import store from "./store";
import Board from "./Board";
import AddNewTodo from "./AddNewTodo";

function App() {
  return (
    <Provider store={store}>
      <div className="big-container">
        <AddNewTodo />
        <Board className="board-container" type="todo" />
        <Board className="board-container" type="inprogress" />
        <Board className="board-container" type="done" />
      </div>
    </Provider>
  );
}

export default App;
