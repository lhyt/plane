import Element from './element.js'
// 画布相关
let $canvas = document.getElementById('game');
let canvas = $canvas
let context = canvas.getContext("2d");
/**
 * 子类 Enemy 射击目标对象
 */ 
var Enemy = function (opts) {
  var opts = opts || {};
  // 调用父类方法
  Element.call(this, opts);

  // 特有属性状态和图标
  this.status = 'normal'; // 可为 normal、booming、boomed
  this.icon = opts.icon;
  this.live = opts.live;
  this.type = opts.type;
  this.live0 = opts.live0
  // 爆炸
  this.boomIcon = opts.boomIcon;
  this.boomCount = 0;
};
// 继承Element的方法
Enemy.prototype = new Element();

/**
 * 方法: down 向下移动一个身位 
 */
Enemy.prototype.down = function() {
  this.move(0, this.speed);
};

//爆炸中
Enemy.prototype.booming=function(){
  this.status = 'booming';
  this.boomCount +=1;
  if(this.boomCount>6){//6帧
    this.status='boomed';
  }
}

// 方法: draw 方法
Enemy.prototype.draw = function() {
  // context.fillRect(this.x, this.y, this.width, this.height);
  // 绘制怪兽
  switch(this.status) {
    case 'normal':
      context.drawImage(this.icon, this.x, this.y, this.width, this.height);
      // context.fillRect(this.x, this.y, this.width, this.height);
      break;
    case 'booming':
      context.drawImage(this.boomIcon, this.x, this.y, this.width, this.height);
      break;
  }
};
export default Enemy