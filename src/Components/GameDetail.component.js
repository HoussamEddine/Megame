import React from "react";

import "./GameDetail.css";
class GameDeatil extends React.Component {
  state = {
    closed: false
  };
  close() {
    this.setState(
      {
        closed: true
      },

      () => this.props.close(this.state.closed)
    );
  }

  render() {
    const score = this.props.score;
    const isActive = this.props.isActive;

    let style;
    if (!isActive) {
      style = {
        display: "flex"
        // marginLeft: "35%",
        // padding: "15%"
      };
    }

    return (
      <div
        className={
          this.props.settings.isPlaying
            ? "game-detail visible"
            : "game-detail hide"
        }
        style={style}
      >
        <p>
          Player Name : <br /> <span>{this.props.settings.playerName}</span>
        </p>
        <p>
          Score : <br /> {score}
        </p>
        <div className="close" onClick={() => this.close()}>
          Close Game
        </div>
      </div>
    );
  }
}
export default GameDeatil;
