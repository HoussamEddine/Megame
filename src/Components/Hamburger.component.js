import React from "react";

import "./Hamburger.css";
class Hamburger extends React.Component {
  state = { isActive: false };
  clickHandler() {
    const { isActive } = this.state;
    this.setState(
      {
        isActive: !isActive
      },
      () => {
        if (this.state.isActive) {
          setTimeout(() => {
            this.setState({
              isActive: false
            });
          }, 2500);
        }
      }
    );

    this.props.shareActiveState(isActive);
  }

  render() {
    const { isActive } = this.state;
    return (
      <div
        id={this.props.isPlaying ? "hamburger" : "hamburger-hidden"}
        onClick={() => this.clickHandler()}
      >
        <button
          className={
            isActive
              ? "hamburger hamburger--elastic is-active"
              : "hamburger hamburger--elastic"
          }
          type="button"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
        <h4>Detail</h4>
      </div>
    );
  }
}

export default Hamburger;
