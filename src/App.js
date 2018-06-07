import React from "react";

import GameTiles from "./Components/GameTiles.component";
import GameSettings from "./Components/GameSettings.component";
import GameDetail from "./Components/GameDetail.component";
import Hamburger from "./Components/Hamburger.component";

import "./App.css";

class App extends React.Component {
  state = {
    closed: false,
    score: 0,
    isActive: true
  };
  getSettingsHandler(settings) {
    this.setState({
      ...settings
    });
  }
  close(cl) {
    this.setState({
      isPlaying: false,
      closed: cl
    });
  }
  getScore(score) {
    this.setState({
      score: score
    });
  }
  done(done) {
    if (done) {
      setTimeout(() => {
        this.setState({
          isPlaying: false
        });
      }, 2500);
    }
  }
  shareActiveState(isActive) {
    this.setState({
      isActive: isActive
    });
    if (isActive === false) {
      setTimeout(() => {
        this.setState({
          isActive: true
        });
      }, 2500);
    }
  }

  render() {
    const { score, isActive, ...settings } = this.state;

    return (
      <React.Fragment>
        <GameSettings
          getSettings={s => this.getSettingsHandler(s)}
          isPlaying={settings.isPlaying}
        />
        <GameDetail
          settings={settings}
          close={closed => this.close(closed)}
          score={score}
          isActive={isActive}
        />
        <GameTiles
          isActive={isActive}
          getScore={score => this.getScore(score)}
          isPlaying={settings.isPlaying}
          done={d => this.done(d)}
        />
        <Hamburger
          isPlaying={settings.isPlaying}
          shareActiveState={isActive => this.shareActiveState(isActive)}
        />
      </React.Fragment>
    );
  }
}

export default App;
