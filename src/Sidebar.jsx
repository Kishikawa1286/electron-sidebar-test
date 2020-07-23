/* ライブラリのテンプレートを使用している部分に警告が出ている */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { Sortable } from "@progress/kendo-react-sortable";
import TimePanel from "./panels/timePanel/timePanel";
import WebViewPanel from "./panels/webViewPanel/webviewPanel";
// import UsagePanel from "./panels/usagePanel";

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
        { id: 0, content: <TimePanel addWebViewPanel={this.addWebViewPanel.bind(this)} /> },
        { id: 1, content: <WebViewPanel id={1} height={520} src="https://youtube.com" /> },
        { id: 2, content: <WebViewPanel id={2} height={500} src="https://discord.com/login" /> },
        { id: 3, content: <WebViewPanel id={3} height={500} src="https://github.com" /> },
      ],
    };
  }

  onDragOver(event) {
    this.setState({ data: event.newState });
  }

  onNavigate(event) {
    this.setState({ data: event.newState });
  }

  addWebViewPanel() {
    const { data } = this.state;
    const { length } = data;
    data.push({ id: length, content: <WebViewPanel height={500} src="https://google.com" /> });
    this.setState({ data });
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
