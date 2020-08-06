import React from "react";
import style from "./webViewPanel.module.css";

const WebViewAppBarButton = (props) => {
  // eslint-disable-next-line react/prop-types
  const { text, onClick } = props;
  return (
    <button
      type="button"
      className={style.webView_appBar_button}
      onClick={onClick}
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
    const {
      // eslint-disable-next-line react/prop-types
      key, height = 200, src = "https://google.com", deleteWebView,
    } = this.props;
    return (
      <div>
        <div className={style.webView_appBar_container}>
          <WebViewAppBarButton text="✕" onClick={deleteWebView} />
          <WebViewAppBarButton text="<" onClick={() => this.webViewRef.goBack()} />
          <WebViewAppBarButton text=">" onClick={() => this.webViewRef.goForward()} />
        </div>
        <div className={style.webView_content_container} height={height}>
          <webview
            key={key || "key_expected"}
            src={src}
            height={height}
            style={{ minHeight: `${height}px` }}
            ref={(webview) => { this.webViewRef = webview; }}
          />
        </div>
      </div>
    );
  }
}

export default WebViewPanel;
