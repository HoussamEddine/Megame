import React from "react";

import "./GameSettings.css";
class GameSettings extends React.Component {
  settings = {};
  state = {
    isPlaying: ""
  };
  clickHandler(e) {
    this.setState(
      {
        isPlaying: true,
        score: 0
      },
      () => {
        this.settings = {
          playerName: this.input.value ? this.input.value : "Player",
          isPlaying: this.state.isPlaying,
          score: 0
        };
        this.props.getSettings(this.settings);
      }
    );
  }

  render() {
    return (
      <div
        className={
          this.props.isPlaying ? "game-settings hide" : "game-settings show"
        }
      >
        <div id="player-name-container">
          <label htmlFor="player-name">
            <p>Player Name</p>
            <input
              type="text"
              id="player-name"
              ref={node => (this.input = node)}
              maxLength={14}
              spellCheck="false"
            />
          </label>
        </div>

        <div id="play" onClick={event => this.clickHandler(event)}>
          Play
        </div>
      </div>
    );
  }
}

export default GameSettings;
