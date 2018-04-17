import React, { Component } from 'react';
import GAME from '../lib/GAME.js'
let status
class Menu extends Component {
	constructor(props){
		super(props)
		status = this.props.status
		this.start = function (e) {
			GAME.init()
			GAME.start()
			status(e)
		}
	}

	render () {
		return (
		<div className="ui-index">
          <h1>丘比特射心心</h1>
          <div className="btn-group">
            <button className="js-start btn" onClick={this.start}>开始游戏</button>
            <button className="js-rule btn" onClick={this.props.status}>游戏说明</button>
            <button className="js-setting btn" onClick={this.props.status}>游戏设置</button>
            <button className="js-nan btn" onClick={this.props.status}>难度选择</button>
          </div>
        </div>
			)
	}
}


export default Menu