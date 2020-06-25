import React from "react";

// 時間の取得処理に脆弱性あり
class TimePanel extends React.Component {
  constructor() {
    super();
    this.state = {
      time: new Date(),
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ time: new Date() });
    }, 500); // 500msごとに時刻表示を更新
  }

  generateDay() {
    const { time } = this.state;
    switch (time.getDay()) {
    case 0: return "Sunday";
    case 1: return "Monday";
    case 2: return "TuesDay";
    case 3: return "Wednesday";
    case 4: return "Thursday";
    case 5: return "Friday";
    case 6: return "Saturday";
    default: return "Error";
    }
  }

  render() {
    const { time } = this.state;
    return (
      <div
        style={{
          height: "72px",
          background: "rgba(0, 0, 0, 0.5)",
          textAlign: "center",
          color: "#FFFFFF",
        }}
      >
        <div
          className="time_upper"
        >
          <p
            style={{
              margin: 0,
              paddingTop: "4px",
              lineHeight: "36px",
              fontSize: "38px",
            }}
          >
            {`${time.getHours()} : ${time.getMinutes()}`}
          </p>
        </div>
        <div
          className="time_lower"
        >
          <p
            style={{
              margin: 0,
              paddingBottom: "4px",
              fontSize: "24px",
            }}
          >
            {`${this.generateDay()}, ${time.getDate()} ${time.getMonth() + 1}, ${time.getFullYear()}`}
          </p>
        </div>
      </div>
    );
  }
}

export default TimePanel;
