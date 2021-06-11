import React, { Component } from "react";
import "./Die.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix } from '@fortawesome/free-solid-svg-icons'


class Die extends Component {
  static defaultProps = {
    faces: [ faSquare, faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix ]
  }

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);

  }
  handleClick(){
    this.props.handleClick(this.props.idx);
    
  }
  render() {
    const {locked, idx, val, disabled, rolling} = this.props
    const classes = `Die ${locked && 'Die-locked'} ${(!locked && rolling) && 'Die-rolling'}`
    return (
      <button
        className={classes}
        // style={{ backgroundColor: locked ? "grey" : "black" }}
        onClick={this.handleClick}
        id={idx}
        disabled={disabled}
      >
        <FontAwesomeIcon icon={this.props.faces[val]} size="5x" />
      </button>
    );
  }
}

export default Die;
