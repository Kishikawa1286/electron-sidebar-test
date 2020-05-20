/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { Sortable } from "@progress/kendo-react-sortable";

const getBaseItemStyle = (isActive) => ({
  width: "44vw",
  height: "44vw",
  margin: "2vw",
  border: "none",
  lineHeight: "68px",
  fontSize: "16px",
  textAlign: "center",
  outline: "none",
  cursor: "move",
  display: "inline-block",
  background: isActive ? "#27aceb" : "#bfe7f9",
  color: isActive ? "#fff" : "#1494d0",
  borderColor: isActive ? "#27aceb" : "#fff",
});

const SortableItemUI = (props) => {
  const {
    isDisabled, isActive, style, attributes, dataItem, forwardRef,
  } = props;
  const classNames = ["col-xs-6 col-sm-3"];

  if (isDisabled) {
    classNames.push("k-state-disabled");
  }

  return (
    <div
      ref={forwardRef}
      {...attributes}
      style={{
        ...getBaseItemStyle(isActive),
        ...style,
      }}
      className={classNames.join(" ")}
    >
      {dataItem.text}
    </div>
  );
};

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 1, text: "item1" },
        { id: 2, text: "item2" },
        { id: 3, text: "item3" },
        { id: 4, text: "item4" },
        { id: 5, text: "item5" },
        { id: 6, text: "item6" },
        { id: 7, text: "item7" },
        { id: 8, text: "item8" },
        { id: 9, text: "item9" },
        { id: 10, text: "item10" },
      ],
    };
  }

  onDragOver(event) {
    this.setState({
      data: event.newState,
    });
  }

  onNavigate(event) {
    this.setState({
      data: event.newState,
    });
  }

  render() {
    return (
      <div
        className="container-fluid"
        style={{
          marginLeft: "2vw",

        }}
      >
        {/* <div className="example-config">
          <h6>
            Items:
            {JSON.stringify(this.state.data)}
          </h6>
        </div> */}
        <Sortable
          idField="id"
          disabledField="disabled"
          data={this.state.data}

          itemUI={SortableItemUI}

          onDragOver={this.onDragOver.bind(this)}
          onNavigate={this.onNavigate.bind(this)}
        />
      </div>
    );
  }
}

export default Sidebar;
