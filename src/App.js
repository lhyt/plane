import React, { Component } from 'react';
import './css/style.css'
import Pannel from './component/Pannel.js'
import Menu from './component/Menu.js'
import a from './static/image/bg_1.jpg'
import Piano from './component/Piano.js'
//import GAME from './lib/GAME.js'
/*if ('paintWorklet' in CSS) {
  CSS.paintWorklet.addModule('worker.js');
} */

document.body.style.setProperty('background-image', 'url('+a+')');
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      status:"index"
    }
    this.changestatus = this.changestatus.bind(this)
  }
  changestatus(e){
    let whitch = e.target.getAttribute('class')
    console.log(whitch)
    if(/confirm/.test(whitch)) this.setState({status:"index"})
      else if(/piano/.test(whitch)) this.setState({status:"piano"})
        else this.setState({status:whitch.match(/-(.*)\s/)[1]}) ;
    window.score = 0
  }
  render() {
    return (
      <div className="App"  data-status={this.state.status}>
      <Piano />
        <Menu status={this.changestatus}/>
        <Pannel status={this.changestatus}/>
      </div>
    );
  }
}

export default App;
