import React, { Component } from 'react';
import $ from 'jquery'
let audioCtx = new AudioContext();
const voiceList = [
    [523.25, 554.37, 587.33, 622.25, 659.26, 698.46, 739.99, 783.99, 830.61, 880, 932.33, 987.77],
    [1046.5, 1108.7, 1174.7, 1244.5, 1318.5, 1396.9, 1480, 1568, 1661.2, 1760, 1864.7, 1975.5],
    [2093, 2217.5, 2349.3, 2489, 2637, 2793.8, 2960, 3136, 3322.4, 3520, 3729.3, 3951.1]
];
function bind() {
    $(document).on('mousedown', '.item-key', function(e) {
        showVioce.call(this);
    }).on('mouseup', '.item-key', function(e) {
        stopVoice.call(this);
        $(this).off();
    }).on('mousedown', function() {
        $(this).on('mousemove', function(e) {
            return false;
        }).on('mouseenter', '.item-key', function() {
            showVioce.call(this);
        }).on('mouseleave', '.item-key', function() {
            stopVoice.call(this);
        }).on('mouseup', function() {
            stopVoice.call(this);
        })
    });

    $(document).on('mouseup', function() {
        stopVoice(true);
    })
}

function bindM() {
    $(document).on('touchstart', '.item-key', function(e) {
        showVioce.call(this);
    }).on('touchend', '.item-key', function(e) {
        stopVoice.call(this);
        $(this).off();
    }).on('touchstart', function() {
        $(this).on('touchmove', function(e) {
            return false;
        }).on('mouseenter', '.item-key', function() {
            showVioce.call(this);
        }).on('mouseleave', '.item-key', function() {
            stopVoice.call(this);
        }).on('touchend', function() {
            stopVoice.call(this);
        })
    });

    $(document).on('touchend', function() {
        stopVoice(true);
    })
}


function showVioce(isAll) {
    let val = $(this).data('frequency');
    $(this).addClass('active');
    this.gainNode && this.gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    this.oscillator && this.oscillator.stop(audioCtx.currentTime + 1);
    // 创建音调控制对象
    this.oscillator = audioCtx.createOscillator();
    // 创建音量控制对象
    this.gainNode = audioCtx.createGain();
    // 音调音量关联
    this.oscillator.connect(this.gainNode);
    // 音量和设备关联
    this.gainNode.connect(audioCtx.destination);
    // 音调类型指定为正弦波
    this.oscillator.type = 'sine';
    // 设置音调频率
    this.oscillator.frequency.value = val;
    // 先把当前音量设为0
    this.gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    // 0.01秒时间内音量从刚刚的0变成1，线性变化
    this.gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
    // 声音走起
    this.oscillator.start(audioCtx.currentTime);

}

function stopVoice(isAll) {
    if (isAll) {
        $('.item-key').removeClass('active');
    } else {
        $(this).removeClass('active');
        this.gainNode && this.gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
        // 0.01秒后停止声音
        this.oscillator && this.oscillator.stop(audioCtx.currentTime + 0.8);
        this.oscillator = this.gainNode = null;
        $(this).off('mouseenter').off('mouseleave');
    }

}



class Piano extends Component {
	componentDidMount () {
		if (/mobule/i.test(navigator.userAgent)) {
		    bindM();
		} else {
		    bind();
		}
	}
	render () {
		return (
				<div id="piano">
					<span className="area">
					{voiceList.map(item => {
		           return <div>{item.map((em, index) => {
   		                    if (index === 1 || index === 3 || index === 6 || index === 8 || index === 10) {
   		                        return (<a className="item-key black" data-frequency={em}></a>)
   		                    } else {
   		                        return (<a className="item-key" data-frequency={em}></a>)
   		                    }
   		
   		                })}</div>
		            })}
		            </span>
				</div>
			)
	}
}

export default Piano