import React from "react";

const WebViewAppBarButton = (props) => {
  // eslint-disable-next-line react/prop-types
  const { text, onClick } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        margin: 0,
        padding: "0 0 0 16px",
        border: "none",
        outline: 0,
        background: "rgba(0, 0, 0, 0)",
        color: "#FFFFFF",
        fontSize: "30px",
        textAlign: "center",
      }}
    >
      {text}
    </button>
  );
};

class WebViewPanel extends React.Component {
  constructor() {
    super();
    this.webViewRef = undefined;
  }

  render() {
  // eslint-disable-next-line react/prop-types
    const { height = 200, src = "https://google.com", deleteWebViewPanel } = this.props;
    return (
      <div>
        <div
          style={{
            width: "100%",
            height: "36px",
            margin: 0,
            padding: 0,
            background: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <WebViewAppBarButton text="✕" onClick={deleteWebViewPanel} />
          <WebViewAppBarButton text="<" onClick={() => this.webViewRef.goBack()} />
          <WebViewAppBarButton text=">" onClick={() => this.webViewRef.goForward()} />
        </div>
        <div style={{ width: "100%", height: `${height}px` }}>
          <webview
            src={src}
            height={height.toString()}
            style={{ minHeight: `${height}px` }}
            ref={(webview) => { this.webViewRef = webview; }}
          />
        </div>
      </div>
    );
  }
}

export default WebViewPanel;
