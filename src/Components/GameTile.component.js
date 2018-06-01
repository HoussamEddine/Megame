import React from "react";

import "./GameTile.css";

class GameTile extends React.Component {
  state = {
    shouldRotate: false
  };

  clickHandler() {
    this.setState({
      shouldRotate: true
    });
    setTimeout(() => {
      this.setState({
        shouldRotate: false
      });
    }, 3000);
  }
  render() {
    const { shouldRotate } = this.state;

    return (
      <div
        className="game-tile"
        onClick={() => {
          this.clickHandler();
        }}
      >
        <div
          className={shouldRotate === true ? `blocker rotateAnim` : "blocker"}
          style={{ background: this.props.background }}
        >
          <img
            className={shouldRotate === true ? `visibilityAnim` : ""}
            src={this.props.src}
            alt={this.props.alt}
            draggable="false"
          />
        </div>
      </div>
    );
  }
}

export default GameTile;
