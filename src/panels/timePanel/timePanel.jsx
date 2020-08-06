import React from "react";

// 時間の取得処理に脆弱性あり
class TimePanel extends React.Component {
  // eslint-disable-next-line react/prop-types
  constructor() {
    super();
    this.state = { time: new Date() };
  }

  componentDidMount() {
    setInterval(
      () => {
        const time = new Date();
        this.setState({ time });
      },
      300,
    ); // 500msごとに時刻表示を更新
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
    const hours = `${time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()}`;
    const minutes = `${time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()}`;
    const seconds = `${time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds()}`;
    return (
      <div
        style={{
          height: "72px",
          background: "rgba(0, 0, 0, 0.5)",
          textAlign: "center",
          color: "#FFFFFF",
        }}
      >
        <div className="time_upper">
          <p
            style={{
              margin: 0,
              paddingTop: "4px",
              lineHeight: "36px",
              fontSize: "38px",
            }}
          >
            {`${hours} : ${minutes} : ${seconds}`}
          </p>
        </div>
        <div className="time_lower">
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
