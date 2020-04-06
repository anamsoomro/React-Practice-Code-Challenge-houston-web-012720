import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

const API = "http://localhost:3000/sushis"

class App extends Component {

  constructor(){
    super()
    this.state = {
      sushis: [],
      index: 0,
      money: 100,
      sushisAte: []
    }
  }

  componentDidMount(){
    fetch(API)
    .then( resp => resp.json() )
    .then( sushiData => {
      let revSushiData = sushiData.map( sushi => { return {...sushi, eaten: false } })
      this.setState({
        sushis: revSushiData
      })
    })
  }

  nextFour = () => {
    return this.state.sushis.slice(this.state.index, this.state.index + 4)
  }

  handleMore = () => {
    let prevIndex = this.state.index
    this.setState({
      index: prevIndex + 4
    })
  }

  handleEat = (clickedSushi) => {
    // if you just change that sushi, javascript points to the same memory location
    // it will update there and everywhere with the same memory
    if ( this.state.money >= clickedSushi.price ){
      // console.log("handleEat beginning", this.state) // wait this part console.logs with eaten already ??
      clickedSushi.eaten = true
      this.state.sushisAte.push(clickedSushi) // why does this let me change the state without using setState ?? 
      // let updatedSushis = [...this.state.sushis, clickedSushi] // same thing memory allocation. not needed. 
      this.setState({
        // sushis: updatedSushis,
        money: this.state.money - clickedSushi.price
      })
    } else { 
      alert (`you aint got ${clickedSushi.name} money`)
    }
  }

  handleMoney = (event) => {
    event.preventDefault()
    this.setState({
      money: this.state.money + parseInt(event.target[0].value)
    })
    event.target.reset()
  }

  render() {
    return (
      <div className="app">
        <SushiContainer sushis={this.nextFour()} handleMore={this.handleMore} eat={this.handleEat}/>
        <Table ate={this.state.sushisAte} money={this.state.money} handleMoney={this.handleMoney}/>
      </div>
    );
  }
}

export default App;