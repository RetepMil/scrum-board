import { useState } from "react";
import { connect } from "react-redux";
import { dbService } from "../fbase";
import store, { remove, edit } from "./store";

const Item = ({ text, type, items, onDeleteClick, editToDo }) => {
  const [editMode, setEditMode] = useState(false);
  const [editTextTo, setEditTextTo] = useState(text);
  const [editTypeTo, setEditTypeTo] = useState(type);

  const onEditClick = () => {
    setEditMode(true);
  };
  const onTextToChange = (e) => {
    setEditTextTo(e.target.value);
  };
  const onTypeToChange = (e) => {
    setEditTypeTo(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //editToDo()
    setEditMode(false);
  };

  store.subscribe(() => {
    console.log(items);
  });

  return (
    <div className="item-container">
      {editMode ? (
        <form onSubmit={onSubmit} id="edit-form">
          <input
            onChange={onTextToChange}
            type="text"
            value={editTextTo}
          ></input>
          <input
            onChange={onTypeToChange}
            type="text"
            value={editTypeTo}
          ></input>
          <button>OK</button>
        </form>
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

const mapStateToProps = (state) => {
  return { items: state };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDeleteClick: async () => {
      const ok = window.confirm("Are you sure you want to delete this?");
      if (ok) {
        dispatch(remove(ownProps.id));
        await dbService.doc(`tasks/${ownProps.id}`).delete();
      }
    },
    editToDo: (info) => dispatch(edit(info)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
