/**
 * 父类：element对象
 */
var Element = function (opts) {
  var opts = opts || {};
  // 设置坐标和尺寸
  this.x = opts.x;
  this.y = opts.y;
  this.width = opts.width;
  this.height = opts.height;
  this.speed = opts.speed;
};
// 子弹对象原型
Element.prototype = {
  /**
   * 原型方法 move 
   */
  move: function(x, y) {
    var addX = x || 0;
    var addY = y || 0;
    this.x += x;
    this.y += y;
  }
};

export default Element