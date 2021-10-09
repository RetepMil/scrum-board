import { connect } from "react-redux";
import Item from "./Item";

const showName = (type) => {
  switch (type) {
    case "todo":
      return "To Do";
    case "inprogress":
      return "In Progress";
    case "done":
      return "Done";
    default:
      return "";
  }
};

const Board = ({ items, type }) => {
  return (
    <>
      <h2 className="board-name">{showName(type)}</h2>
      {items.map((item) =>
        item.type === type ? <Item {...item} key={item.id} /> : null
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return { items: state };
};

export default connect(mapStateToProps)(Board);
