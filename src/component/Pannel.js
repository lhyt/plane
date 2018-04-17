import React, { Component } from 'react';
import p1 from '../static/image/bg_1.jpg'
import p2 from '../static/image/bg_2.jpg'
import p3 from '../static/image/bg_3.jpg'
import p4 from '../static/image/bg_4.jpg'
const img = [p1,p2,p3,p4]
class Pannel extends Component {
	constructor(props){
		super(props)
		this.change = this.change.bind(this)
	}
	change (e){
		document.body.style.setProperty('background-image', 'url('+img[e.target.value - 1]+')');
	}
	render () {
		return (
			<div>
		        <div className="score">
		          <button onClick={this.props.status} className="confirm">回到主页</button>
		          <span> 分数：</span>
		          <span id="ui-score">0</span>
		        </div>
				 <div className="ui-rule ui-panel">
			      <h2>游戏说明</h2>
			      <p>手指移动飞机，不是白色心心的全是敌人，是男人就坚持90秒。电脑的按f12进入开发者工具模拟手机环境，按住鼠标拖动飞机（类似人用手触屏）。具体步骤：f12→点击三个点设置屏幕左右分布→ctrl+shift+m，显示有问题按ctrl+0，还可以在上面选择模拟苹果手机哦</p>
			      <button className="js-confirm-rule"  onClick={this.props.status}>我知道了</button>
			    </div>
			    <div className="ui-end ui-panel">
			      <h2>游戏结束</h2>
			      <p>要不玩玩小钢琴</p>
			      <button className="js-confirm-rule"  onClick={this.props.status}>回到主页</button>
			      <button className="go-piano"  onClick={this.props.status}>试试看</button>
			    </div>
			    <div className="ui-nan ui-panel">
			      <h2>难度选择</h2>
			      <select id="setting-nan">
			        <option className="nandu" value="1">简单</option>
			        <option className="nandu" value="2">一般</option>
			        <option className="nandu" value="3">困难</option>
			        <option className="nandu" value="4">恶梦</option>
			      </select>
			      <button className="js-confirm-rule"  onClick={this.props.status}>OK</button>
			    </div>
			    <div className="ui-setting ui-panel">
			      <h2>游戏设置</h2>
			      <ul className="setting-group">
			        <li className="setting">
			          <span className="setting-title">音乐设置</span>
			          <select id="setting-music">
			            <option value="1">开启音乐</option>
			            <option value="0">关闭音乐</option>
			          </select>
			        </li>
			        <li className="setting">
			          <span className="setting-title">背景设置</span>
			          <select id="setting-bg" onChange={this.change}>
			            <option className="beijing" value="1">海上夕阳</option>
			            <option className="beijing" value="2">紫色熏衣</option>
			            <option className="beijing" value="3">夜幕降临</option>
			            <option className="beijing" value="4">血红之夜</option>
			          </select>
			        </li>
			        <li className="setting">
			          <span className="setting-title">战机设置</span>
			          <select id="setting-plane">
			            <option value="bluePlaneIcon">红色丘比特</option>
			            <option value="pinkPlaneIcon">粉红战机</option>
			          </select>
			        </li>
			      </ul>
			      <button className="js-confirm-setting" onClick={this.props.status}>确认设置</button>
			    </div>
			    </div>
			)
	}
}


export default Pannel