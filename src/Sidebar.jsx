/* ライブラリのテンプレートを使用している部分に警告が出ている */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { Sortable } from "@progress/kendo-react-sortable";
import { generate } from "shortid";
import TimePanel from "./panels/timePanel/timePanel";
import WebViewPanel from "./panels/webViewPanel/webviewPanel";
import AddWebViewpanel from "./panels/webViewPanel/addWebViewPanel";
import UsagePanel from "./panels/usagePanel/usagePanel";

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

  if (isDisabled) classNames.push("k-state-disabled");

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
        { id: 0, content: <TimePanel /> },
        { id: 1, content: <UsagePanel /> },
        { id: 2, content: <AddWebViewpanel addWebView={this.addWebView.bind(this)} /> },
      ],
    };
  }

  onDrag(event) {
    this.setState({ data: event.newState });
  }

  addWebView(src = "https://google.com") {
    const { data } = this.state;
    const { length } = data;
    const key = generate();
    data.push({
      id: length,
      content: <WebViewPanel
        key={key}
        height={500}
        src={src}
        deleteWebView={() => this.deleteWebView(length)}
      />,
    });
    this.setState({ data });
  }

  deleteWebView(deletedId) {
    const { data } = this.state;
    const sliced = data.filter((element) => element.id !== deletedId);
    const newState = sliced.map((element) => {
      const { props } = element.content;
      if (element.id > deletedId) {
        return {
          id: element.id - 1,
          content: <WebViewPanel
            key={props.key}
            height={props.height}
            src={props.src}
            deleteWebView={() => this.deleteWebView(element.id - 1)}
          />,
        };
      }
      return element;
    });
    this.setState({ data: newState });
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
          onDragOver={this.onDrag.bind(this)}
          onNavigate={this.onDrag.bind(this)}
        />
      </div>
    );
  }
}

export default Sidebar;
