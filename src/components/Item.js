import { useState } from "react";
import { connect } from "react-redux";
import { dbService } from "../fbase";
import { remove, edit } from "./store";

const Item = ({ id, text, type, onDeleteClick, editToDo }) => {
  const [editMode, setEditMode] = useState(false);
  const [editTextTo, setEditTextTo] = useState(text);
  const [editTypeTo, setEditTypeTo] = useState(type);

  const onEditClick = () => {
    setEditMode(true);
  };
  const onCancelClick = () => {
    setEditMode(false);
  };
  const onTextToChange = (e) => {
    setEditTextTo(e.target.value);
  };
  const onTypeToChange = (e) => {
    setEditTypeTo(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const updateTo = {
      id,
      text: editTextTo,
      type: editTypeTo,
    };
    await dbService.doc(`tasks/${id.toString()}`).update({ ...updateTo });
    editToDo(updateTo);
    setEditTextTo(updateTo.text);
    setEditTypeTo(updateTo.type);
    setEditMode(false);
  };

  return (
    <div className="item-container">
      {editMode ? (
        <>
          <form onSubmit={onSubmit} id="edit-form">
            <input
              onChange={onTextToChange}
              type="text"
              value={editTextTo}
            ></input>
            <select name="types" defaultValue={type} onChange={onTypeToChange}>
              <option value="todo">toDo</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <button>OK</button>
          </form>
          <button onClick={onCancelClick}>Cancel</button>
        </>
      ) : (
        <>
          {text}
          <button onClick={onEditClick}>edit</button>
          <button onClick={onDeleteClick}>delete</button>
        </>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDeleteClick: async () => {
      const ok = window.confirm("Are you sure you want to delete this?");
      if (ok) {
        dispatch(remove(ownProps.id));
        await dbService.doc(`tasks/${ownProps.id.toString()}`).delete();
      }
    },
    editToDo: (info) => dispatch(edit(info)),
  };
};

export default connect(null, mapDispatchToProps)(Item);
