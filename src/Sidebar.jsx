/* ライブラリのテンプレートを使用している部分に警告が出ている */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { Sortable } from "@progress/kendo-react-sortable";
import TimePanel from "./panels/timePanel";
import WebviewPanel from "./panels/webviewPanel";
import UsagePanel from "./panels/usagePanel";

const getBaseItemStyle = (isDragCue) => ({
  width: "92vw",
  margin: "8px 4vw 8px 4vw",
  border: "none",
  outline: "none",
  cursor: "move",
  display: isDragCue ? "none" : "inline-block", // disable drag cue
});

const SortableItemUI = (props) => {
  const {
    isDisabled, isDragCue, style, attributes, dataItem, forwardRef,
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
        // dataItem.height is an optional assignment
        ...getBaseItemStyle(isDragCue),
        ...style,
      }}
      className={classNames.join("")}
    >
      {dataItem.content}
    </div>
  );
};

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 1, content: <TimePanel /> },
        { id: 2, content: <WebviewPanel height={520} src="https://youtube.com" /> },
        { id: 3, content: <WebviewPanel height={500} src="https://discord.com/login" /> },
        { id: 4, content: <WebviewPanel height={500} src="https://github.com" /> },
        { id: 5, content: <UsagePanel /> },
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
    const { data } = this.state;
    return (
      <div
        className="container-fluid"
        style={{
          height: "100vh",
          backgroundColor: "rgba(64, 64, 64, 0.3)",
        }}
      >
        <Sortable
          idField="id"
          disabledField="disabled"
          data={data}

          itemUI={SortableItemUI}

          onDragOver={this.onDragOver.bind(this)}
          onNavigate={this.onNavigate.bind(this)}
        />
      </div>
    );
  }
}

export default Sidebar;
