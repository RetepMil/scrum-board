import { useState } from "react";
import { connect } from "react-redux";
import { dbService } from "../fbase";
import { add } from "./store";

const AddNewTodo = ({ addToDo }) => {
  const [newTask, setNewTask] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    const newId = Date.now();
    const task = {
      id: newId,
      text: newTask,
      type: "todo",
    };
    await dbService.doc(`tasks/${newId.toString()}`).set({ ...task });
    addToDo(task);
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
      <input type="submit" value="ADD"></input>
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
