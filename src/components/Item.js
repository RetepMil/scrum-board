import { connect } from "react-redux";
import { remove, changeType, changeText } from "./store";

const Item = ({
  text,
  id,
  type,
  items,
  onEditClick,
  onDeleteClick,
  onTypeChangeClick,
}) => {
  return (
    <div className="item-container">
      {text}
      <button onClick={onEditClick}>edit</button>
      <button onClick={onDeleteClick}>delete</button>
      <button onClick={onTypeChangeClick}>change state</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { items: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteClick: (info) => dispatch(remove(info)),
    onTypeChangeClick: (info) => dispatch(changeType(info)),
    onEditClick: (info) => dispatch(changeText(info)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
