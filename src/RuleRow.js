import React, { Component } from 'react';
import './RuleRow.css'

class RuleRow extends Component {
  render() {
    const {score, name, doScore, description} = this.props
    let disabled = score !== undefined;
    return (
      <button className={`RuleRow RuleRow-${ disabled ? 'disabled' : 'active' }`} 
      onClick={ disabled ? null : doScore }>
        <span className="RuleRow-name">{ name }</span>
        <span className="RuleRow-score">{ disabled ? score : description }</span>
      </button>
    )
  }
}

export default RuleRow;