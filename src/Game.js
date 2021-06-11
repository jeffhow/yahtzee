import React, { Component } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import "./Game.css";
import Realistic from './Realistic'
import Replay from './Replay'

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array.from({ length: NUM_DICE }, () => 0),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      rolling: false,
      gameOver: false,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      }
    };
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
    this.animateRoll = this.animateRoll.bind(this);
    this.displayRollInfo = this.displayRollInfo.bind(this);
    this.restart = this.restart.bind(this);
  }

  restart(){
    this.setState(
      {
        dice: Array.from({ length: NUM_DICE }, () => 0),
        locked: Array(NUM_DICE).fill(false),
        rollsLeft: NUM_ROLLS,
        rolling: false,
        gameOver: false,
        scores: {
          ones: undefined,
          twos: undefined,
          threes: undefined,
          fours: undefined,
          fives: undefined,
          sixes: undefined,
          threeOfKind: undefined,
          fourOfKind: undefined,
          fullHouse: undefined,
          smallStraight: undefined,
          largeStraight: undefined,
          yahtzee: undefined,
          chance: undefined
        }
      }
    );
    this.animateRoll();
  }
  
  animateRoll(){
    // set state with callback
    this.setState({rolling:true}, ()=>{
      setTimeout(this.roll,1000);
    })
  }
  roll(evt) {
    // roll dice whose indexes are in reroll
    
    this.setState(st => ({
      // dice: [5,5,5,5,5],
      dice: st.dice.map((d, i) =>
      st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1,
      rolling: false,
    }));
  }
  
  toggleLocked(idx) {
    // toggle whether idx is in locked or not
    if(this.state.rollsLeft > 0 && !this.state.rolling){
      this.setState(st => ({
        locked: [
          ...st.locked.slice(0, idx),
          !st.locked[idx],
          ...st.locked.slice(idx + 1)
        ]
      }));
    }
  }

  doScore(rulename, ruleFn) {
    // Disallow scoring while dice are rolling
    if(!this.state.rolling){
      // evaluate this ruleFn with the dice and score this rulename
      this.setState(st => ({
        scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
        rollsLeft: NUM_ROLLS,
        locked: Array(NUM_DICE).fill(false)
      }), () => {
        // callback function after setstate
        // test for GameOver
        if(!Object.values(this.state.scores).some(s=>s===undefined)){
          this.setState({gameOver: true})
        }else{
          this.animateRoll();
        }
      });
      
    }
  }

  displayRollInfo(){
    const messages =[
      '0 Rerolls left',
      '1 Rerolls left',
      '2 Rerolls left',
      'Starting round'
    ]
    return messages[this.state.rollsLeft];
  }

  /**
   * This method runs after the very first render
   */
  componentDidMount(){
    this.animateRoll();
  }

  render() {
    return (
      <div className='Game'>
        {
          this.state.gameOver && <Replay handleRestart={this.restart} />
        }
        <section className="Game-board">
          <header className='Game-header'>
            <h1 className='App-title'>Yahtzee!</h1>

            <section className='Game-dice-section'>
              <Dice
                dice={this.state.dice}
                locked={this.state.locked}
                handleClick={this.toggleLocked}
                disabled={this.state.rollsLeft===0}
                rolling={this.state.rolling}
                />
              <Realistic yahtzee={
                this.state.dice.every(d=>d===this.state.dice[0] && d > 0) && !this.state.rolling
              }/>
              <div className='Game-button-wrapper'>
                <button
                  className='Game-reroll'
                  disabled={this.state.locked.every(x => x) || this.state.rolling}
                  // onClick={this.roll}
                  onClick={this.animateRoll}
                  >
                  {this.displayRollInfo()}
                  {/* {this.state.rollsLeft} Reroll{this.state.rollsLeft !== 1 && 's'} Left */}
                </button>
              </div>
            </section>
          </header>
          <ScoreTable doScore={this.doScore} scores={this.state.scores} />
        <footer>
          <p>A learning project by <a href="https://jeff.how" target="_blank" rel="noopener noreferrer">Jeff.How</a></p>
        </footer>
        </section>
      </div>
    );
  }
}

export default Game;
