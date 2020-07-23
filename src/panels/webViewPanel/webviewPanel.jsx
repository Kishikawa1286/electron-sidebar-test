import React from "react";

const WebViewPanel = (props) => {
  // eslint-disable-next-line react/prop-types
  const { height = 200, src = "https://google.com" } = props;
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
      />
      <div style={{ width: "100%", height: `${height}px` }}>
        <webview src={src} height={height.toString()} style={{ minHeight: `${height}px` }} />
      </div>
    </div>
  );
};

export default WebViewPanel;
