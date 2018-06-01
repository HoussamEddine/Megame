import React from "react";

import GameTile from "./GameTile.component";

import iconArr from "./Icons/";

import "./GameTiles.css";

class GameTiles extends React.Component {
  state = {
    score: 0,
    done: false
  };
  colors = [
    "#f17187",
    "#7971f1",
    "#628ff5",
    "#50e8ef",
    "#c0ffd0",
    "#ffefc0",
    "#ef5f3f"
  ];

  random = Math.floor(Math.random() * this.colors.length);
  elemsClicked = [];
  elemsClickedFilterd = [];

  returnDublicate = a => {
    let dublicate = [];
    for (var i = 0; i < a.length; i++) {
      for (var j = i; j < a.length; j++) {
        if (i !== j && a[i].src === a[j].src) {
          dublicate.push(a[i]);
          dublicate.push(a[j]);
        }
      }
    }
    return dublicate;
  };
  shuffle = arr => {
    let j, x;
    for (
      let i = arr.length;
      i;
      j = Math.floor(Math.random() * i),
        x = arr[--i],
        arr[i] = arr[j],
        arr[j] = x
    );
    return arr;
  };
  iconArrShuffeld = this.shuffle(iconArr);

  clickHandler(event) {
    const children = Array.from(this.node.children);
    const done = children.every(e => {
      return e.style.pointerEvents === "none";
    });
    if (!done) {
      this.setState(
        prevState => {
          return {
            score: prevState.score + 1
          };
        },

        () => {
          this.props.getScore(this.state.score);
        }
      );

      if (!event.target.classList.contains("game-tiles")) {
        this.elemsClicked.push(event.target);
      }

      this.elemsClicked.forEach(elem => {
        let img;
        if (elem.children.length !== 0) {
          img = elem.children[0];
        } else {
          img = elem;
        }
        if (!this.elemsClickedFilterd.includes(img)) {
          this.elemsClickedFilterd.push(img);
          this.elemsClicked = [];
        }
        return this.elemsClickedFilterd;
      });
      this.elemsClickedFilterd.forEach((e, i, a) => {
        let match = this.returnDublicate(a);

        setTimeout(() => {
          this.elemsClickedFilterd.pop(e);
          match.forEach((e, a) => {
            const parent = e.parentNode;
            e.style.opacity = 1;
            e.style.transform = "rotateY(0deg)";
            if (
              parent.className !== "game-tiles" &&
              parent.className !== "game-container"
            ) {
              parent.style.background = "#f5f3f3";
              parent.parentNode.style.transform = "scale(0.9)";
              parent.parentNode.style.pointerEvents = "none";
              parent.parentNode.style.transition = "all 200ms ease-in";
            }
          });
        }, 3000);
      });
    } else {
      this.setState({
        done: true
      });
      return this.props.done(done);
    }
  }

  componentWillReceiveProps(nextProps) {
    const children = Array.from(this.node.children);

    if (!nextProps.isPlaying) {
      children.forEach(e => {
        e.style.pointerEvents = "";
        e.firstElementChild.style.background = this.colors[this.random];
        e.firstElementChild.firstElementChild.style.opacity = 0;

        e.parentNode.style.transition = "";
        e.style.transform = "scale(1)";
      });
      this.setState({
        score: 0
      });
      this.iconArrShuffeld = this.shuffle(iconArr);
    }
  }
  render() {
    return (
      <div
        className={
          this.props.isPlaying ? " game-container show" : "game-container hide"
        }
      >
        <div
          className="game-tiles show"
          onClick={event => this.clickHandler(event)}
          ref={n => (this.node = n)}
          style={{ background: "#f5f3f3" }}
          draggable="false"
        >
          {this.iconArrShuffeld.map((element, i) => {
            return (
              <GameTile
                src={element}
                alt={element.slice(14, 18)}
                key={i}
                getScore={s => this.getScore(s)}
                background={this.colors[this.random]}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default GameTiles;
