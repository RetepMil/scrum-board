import { useState } from "react";
import { connect } from "react-redux";
import { dbService } from "../fbase";
import { add } from "./store";

const AddNewTodo = () => {
  const [newTask, setNewTask] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    const task = {
      text: newTask,
      id: Date.now(),
      type: "todo",
    };
    await dbService.collection("tasks").add(task);
    setNewTask("");
  };

  const onChange = (e) => {
    setNewTask(e.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={onChange}
        type="text"
        value={newTask}
        placeholder="Enter new task here"
      ></input>
      <button>Add</button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return { items: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToDo: (info) => dispatch(add(info)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewTodo);
