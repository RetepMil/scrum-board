import { Provider } from "react-redux";
import store from "./store";
import Board from "./Board";

function App() {
  return (
    <Provider store={store}>
      <Board className="board-container" type="todo" />
      <Board className="board-container" type="inprogess" />
      <Board className="board-container" type="done" />
    </Provider>
  );
}

export default App;
