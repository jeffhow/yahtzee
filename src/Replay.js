import React from "react";
import './Replay.css'

class Replay extends React.Component{
    static defaultProps = {
        score: 0,
    }
    render(){
        return(
            <div className="Replay">
                <header className="Replay-header">Game Over!</header>
                <p>Thanks for playing!</p>
                <p>Your final score was: {this.props.score}</p>
                <button className="Replay-button" onClick={this.props.handleRestart}>Play Again?</button>
            </div>
        )
    }
}

export default Replay
