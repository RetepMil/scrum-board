import { connect } from "react-redux";
import { add } from "./store";
import Item from "./Item";

const Board = ({ items, type }) => {
  return (
    <>
      <h2>{type}</h2>
      {items.map((item) =>
        item.type === type ? <Item {...item} key={item.id} /> : null
      )}
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Board);
