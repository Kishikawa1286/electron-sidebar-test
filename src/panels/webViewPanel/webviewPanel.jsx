import React from "react";

const WebViewPanel = (props) => {
  // eslint-disable-next-line react/prop-types
  const { height = 200, src = "https://google.com" } = props;
  return (
    <div style={{ width: "100%", height: `${height}px` }}>
      <webview src={src} height={height.toString()} style={{ minHeight: `${height}px` }} />
    </div>
  );
};

export default WebViewPanel;
