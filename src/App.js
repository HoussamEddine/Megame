import React from "react";

import GameTiles from "./Components/GameTiles.component";
import GameSettings from "./Components/GameSettings.component";
import GameDetail from "./Components/GameDetail.component";
import "./App.css";

class App extends React.Component {
  state = {
    closed: false,
    score: 0
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
  render() {
    const { score, ...settings } = this.state;

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
        />
        <GameTiles
          visibility={settings.isPlaying ? "visible" : "hidden"}
          getScore={score => this.getScore(score)}
          isPlaying={settings.isPlaying}
          done={d => this.done(d)}
        />
      </React.Fragment>
    );
  }
}

export default App;
