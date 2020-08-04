import React from "react";
import { generate } from "shortid";

const AddWebViewButton = (props) => {
  const {
    // eslint-disable-next-line react/prop-types
    addWebView, src = "https://google.com", deleteAddWebViewButton,
  } = props;
  return (
    <div
      style={{
        width: "100%",
        height: "50px",
        margin: 0,
        padding: "10px 0 10px 20px",
      }}
    >
      <button
        type="button"
        onClick={() => addWebView(src)}
        style={{
          width: "calc(100% - 70px)",
          height: "50px",
          margin: 0,
          padding: 0,
          border: "none",
          outline: 0,
          background: "rgba(0, 0, 0, 0)",
          fontSize: "30px",
          color: "#FFFFFF",
          textAlign: "left",
        }}
      >
        {src}
      </button>
      <button
        type="button"
        onClick={() => deleteAddWebViewButton()}
        style={{
          width: "50px",
          height: "50px",
          marginRight: 0,
          padding: 0,
          border: "none",
          outline: 0,
          background: "rgba(0, 0, 0, 0)",
          fontSize: "30px",
          color: "#FFFFFF",
          textAlign: "center",
        }}
      >
        -
      </button>
    </div>
  );
};

class AddWebViewPanel extends React.Component {
  constructor(props) {
    // eslint-disable-next-line react/prop-types
    const { addWebView } = props;
    super(props);
    this.deleteAddWebViewButton = this.deleteAddWebViewButton.bind(this);
    const originalKeys = [generate(), generate(), generate(), generate()];
    this.state = {
      AddWebViewButtons: [
        <AddWebViewButton key={originalKeys[0]} deleteAddWebViewButton={() => this.deleteAddWebViewButton(originalKeys[0])} addWebView={addWebView} src="https://google.com" />,
        <AddWebViewButton key={originalKeys[1]} deleteAddWebViewButton={() => this.deleteAddWebViewButton(originalKeys[1])} addWebView={addWebView} src="https://discord.com/login" />,
        <AddWebViewButton key={originalKeys[2]} deleteAddWebViewButton={() => this.deleteAddWebViewButton(originalKeys[2])} addWebView={addWebView} src="https://youtube.com" />,
        <AddWebViewButton key={originalKeys[3]} deleteAddWebViewButton={() => this.deleteAddWebViewButton(originalKeys[3])} addWebView={addWebView} src="https://github.com" />,
      ],
    };
    this.inputRef = undefined;
  }

  createNewAddWebViewButton(src) {
    // eslint-disable-next-line react/prop-types
    const { addWebView } = this.props;
    const { AddWebViewButtons } = this.state;
    const key = generate();
    const newButton = (
      <AddWebViewButton
        key={key}
        deleteAddWebViewButton={() => this.deleteAddWebViewButton(key)}
        addWebView={addWebView}
        src={src}
      />
    );
    const buttons = Object.assign([], AddWebViewButtons); // 新しくコピーを生成して破壊的変更を加える
    buttons.push(newButton);
    this.setState({ AddWebViewButtons: buttons });
  }

  deleteAddWebViewButton(targetKey) {
    const { AddWebViewButtons } = this.state;
    const buttons = Object.assign([], AddWebViewButtons); // 新しくコピーを生成して破壊的変更を加える
    const filtered = buttons.filter((element) => element.key !== targetKey);
    this.setState({ AddWebViewButtons: filtered });
  }

  render() {
    const { AddWebViewButtons } = this.state;
    return (
      <div style={{ background: "rgba(0, 0, 0, 0.5)", paddingTop: "50px" }}>
        <div
          style={{
            width: "100%",
            height: "50px",
            margin: 0,
          }}
        >
          <input
            type="text"
            style={{
              width: "calc(100% - 70px)",
              height: "50px",
              margin: 0,
              padding: "0 0 0 20px",
              border: "none",
              outline: 0,
              background: "rgba(0, 0, 0, 0)",
              fontSize: "30px",
              color: "#FFFFFF",
            }}
            ref={(input) => { this.inputRef = input; }}
            onKeyPress={(event) => {
              if (event.key === "Enter" && this.inputRef.value !== "") {
                this.createNewAddWebViewButton(this.inputRef.value);
                this.inputRef.value = "";
              }
            }}
          />
          <button
            type="button"
            onClick={() => {
              if (this.inputRef.value !== "") {
                this.createNewAddWebViewButton(this.inputRef.value);
                this.inputRef.value = "";
              }
            }}
            style={{
              width: "50px",
              height: "50px",
              marginRight: 0,
              padding: 0,
              border: "none",
              outline: 0,
              background: "rgba(0, 0, 0, 0)",
              fontSize: "30px",
              color: "#FFFFFF",
              textAlign: "center",
            }}
          >
            +
          </button>
        </div>
        {AddWebViewButtons}
      </div>
    );
  }
}

export default AddWebViewPanel;
