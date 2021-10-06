import { Provider } from "react-redux";
import store from "./store";
import Board from "./Board";

function App() {
  return (
    <Provider store={store}>
      <Board type="todo" />
      <Board type="inprogess" />
      <Board type="done" />
    </Provider>
  );
}

export default App;
