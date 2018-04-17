import CONFIG from './config.js'
import resourceHelper from './resource.js'
import Plane from './plane.js'
import Enemy from './enemy.js'
import fire1 from './img/1.png'
import fire from './img/fire.png'
// 画布相关
let $canvas = document.getElementById('game');
let canvas = $canvas
let context = canvas.getContext("2d");
// 设置画布的宽度和高度
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// 获取画布相关信息
let canvasWidth = canvas.clientWidth;
let canvasHeight = canvas.clientHeight;
let s = 0
// 判断是否有 requestAnimationFrame 方法，如果有则模拟实现
window.requestAnimFrame =
window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function(callback) {
    window.setTimeout(callback, 1000 / 30);
};
resourceHelper.load(CONFIG.resources, function(resources) {
    // 加载完成
    GAME.init();
    GAME.bindTouchAction();
  });
var GAME = {
  /**
   * 游戏初始化
   */
  opts:null,
  init: function(opts) {
    // 设置opts
    var opts = Object.assign({}, opts, CONFIG);
    this.opts = opts;
    
    // 计算飞机初始坐标
    this.planePosX = canvasWidth / 2 - opts.planeSize.width / 2;
    this.planePosY = canvasHeight - opts.planeSize.height - 50;

  },
  /**
   * 游戏开始需要设置
   */
  start: function () {
    // 获取游戏初始化 level
    var self = this; // 保存函数调用对象（即Game）
    var opts = this.opts;
    var images = this.images;
    // 清空射击目标对象数组和分数设置为 0
    this.enemies = []; 
    this.score = 0;

    // 随机生成大小敌机
    this.list = [setInterval(function () {
      self.createEnemy('normal');
    }, 300),
    setInterval(function () {
      self.createEnemy('big');
    }, 1500),
    setInterval(function () {
      self.createEnemy('fast');
    }, 5000),
    setInterval(function () {
      self.createEnemy('boss');
    }, 8000),
    setInterval(function () {
      self.createEnemy('veryfast');
    }, 10000),
    setInterval(function () {
      self.createEnemy('enemyu');
    }, 15000)]

    //生成主机
      this.plane = new Plane({
      x:this.planePosX,
      y:this.planePosY,
      width:opts.planeSize.width,
      height:opts.planeSize.height,
      //子弹大小和速度
      bulletSize:opts.bulletSize,
      bulletSpeed:opts.bulletSpeed,
      //icon
      icon:resourceHelper.getImage('bluePlaneIcon'),
      bulletIcon:resourceHelper.getImage('fireIcon'),
      boomIcon:resourceHelper.getImage('enemyBigBoomIcon'),
        
      
    });
    //开始射击
    this.plane.startShoot();
    
    // 开始更新游戏
    this.update();
  },
  update: function () {
    var self = this;
    var opts = this.opts;
    // 更新飞机、敌人
    this.updateElement();

    // 先清理画布
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    if(this.plane.status==='boomed'){
      this.end();
      return;
    }
    
    // 绘制画布
    this.draw();
    
    // 不断循环 update
    window.requestAnimFrame(function() {
      self.update()
    });
  },
  /**
   * 更新当前所有元素的状态
   */
  updateElement: function() {
    var opts = this.opts;
    var enemySize = opts.enemySize;
    var enemies = this.enemies;
    var plane= this.plane;
    var i = enemies.length;

    //主机爆炸相关
    if(plane.status==='booming'){
      plane.booming();
      return;
    }

  
    // 循环更新怪兽
    while (i--) {
      var enemy = enemies[i];
      enemy.down();
      if (enemy.y >= canvasHeight) {
        this.enemies.splice(i, 1);
      } else {
        // 判断飞机状态
        if(plane.status==='normal'){
          if(plane.hasCrash(enemy)){
            plane.booming();
          }
        }

        //根据怪兽状态判断是否被击中
        switch (enemy.status) {
            case 'normal':
            if(plane.hasHit(enemy)){
              enemy.live-=this.plane.atk;
              if (enemy.live<=0) {
                enemy.booming();
              }
            }
            break;
            case 'booming':
            enemy.booming();
            break;
            case 'boomed':
            this.score += enemy.live0
            window.score += enemy.live0
            enemies.splice(i,1);
            break;
        }
      }
    }
  },
  //触屏
  bindTouchAction:function(){
    var opts = this.opts;
    var self = this;
    //飞机极限坐标
    var planeMinX = 0;
    var planeMinY = 0;
    var planeMaxX = canvasWidth-opts.planeSize.width;
    var planeMaxY = canvasHeight-opts.planeSize.height;
    //手指初始位置
    var startTouchX;
    var startTouchY;
    //飞机初始位置
    var startPlaneX;
    var startPlaneY;

    //第一次触屏
    $canvas.ontouchstart = function(e){
      var plane = self.plane;//记录首次位置
      startTouchX = e.touches[0].clientX;
      startTouchY = e.touches[0].clientY;
      //console.log('touchstart',startTouchX,startTouchY)
      startPlaneX = plane.x;
      startPlaneY = plane.y;
    };

    //手指滑动
    $canvas.ontouchmove = function(e){
      var newTouchX = e.touches[0].clientX;
      var newTouchY = e.touches[0].clientY;
//console
     //新的坐标
      var newPlaneX = startPlaneX+newTouchX-startTouchX;
      var newPlaneY = startPlaneY+newTouchY-startTouchY;
      //是否超界
      if (newPlaneX<planeMinX) {
        newPlaneX=planeMinX;
      }
      if (newPlaneX>planeMaxX) {
        newPlaneX = planeMaxX;
      }
      if (newPlaneY>planeMaxY) {
        newPlaneY = planeMaxY;
      }
      if (newPlaneY<planeMinY) {
        newPlaneY = planeMinY;
      }

      //更新位置
      self.plane.setPosition(newPlaneX,newPlaneY);
      //防止滚屏（默认事件）
      e.preventDefault();
    };
  },



  /**
   * 生成怪兽
   */
  createEnemy: function(enemyType) {
    var enemies = this.enemies;
    var opts = this.opts;
    var images = this.images || {};
    var enemySize = opts.enemySmallSize;
    var enemySpeed = opts.enemySpeed;
    var enemyIcon = resourceHelper.getImage('enemySmallIcon');
    var enemyBoomIcon = resourceHelper.getImage('enemySmallBoomIcon');
  
  
    var enemyLive = 10; 
  
    // 敌机参数
    if (enemyType === 'big') {
      enemySize = opts.enemyBigSize;
      enemyIcon = resourceHelper.getImage('enemyBigIcon');
      enemyBoomIcon = resourceHelper.getImage('enemyBigBoomIcon');
      enemySpeed = opts.enemySpeed * 0.6;
      enemyLive = 40;
    } 
    if (enemyType === 'boss') {
      enemySize = opts.enemyBossSize;
      enemyIcon = resourceHelper.getImage('enemyBossIcon');
      enemyBoomIcon = resourceHelper.getImage('enemyBossBoomIcon');
      enemySpeed = opts.enemySpeed * 0.2;
      enemyLive = 120;
    } 
    if (enemyType === 'fast') {
      enemySize = opts.enemyBigSize;
      enemyIcon = resourceHelper.getImage('enemyFastIcon');
      enemyBoomIcon = resourceHelper.getImage('enemyBigBoomIcon');
      enemySpeed = opts.enemySpeed * 4;
      enemyLive = 5;
    } 
    if (enemyType === 'veryfast') {
      enemySize = opts.enemyBigSize;
      enemyIcon = resourceHelper.getImage('enemyFastIcon');
      enemyBoomIcon = resourceHelper.getImage('enemyBigBoomIcon');
      enemySpeed = opts.enemySpeed * 6;
      enemyLive = 1;
    } 
    if (enemyType === 'enemyu') {
      enemySize = opts.enemyuSize;
      enemyIcon = resourceHelper.getImage('enemyuIcon');
      enemyBoomIcon = resourceHelper.getImage('enemyuBoomIcon');
      enemySpeed = opts.enemySpeed * 0.08;
      enemyLive = 300;
    } 
    // 综合元素的参数
    var initOpt = {
      x: Math.floor(Math.random() * (canvasWidth - enemySize.width)), 
      y: -enemySize.height,
      type: enemyType,
      live: enemyLive,
      width: enemySize.width,
      height: enemySize.height,
      speed: enemySpeed,
      icon: enemyIcon,
      boomIcon: enemyBoomIcon,
      live0:enemyLive
    }
  
    // 怪兽的数量不大于最大值则新增
    if (enemies.length < opts.enemyMaxNum) {
      enemies.push(new Enemy(initOpt));
    }
  },
  end: function() {
    this.enemies = []
    this.list.forEach(t=>{
      clearInterval(t)
    })
    document.querySelector('.App').setAttribute('data-status','end')
  },
  draw: function() {
    this.enemies.forEach(function(enemy) {
      enemy.draw();
    });
    this.plane.draw();
  }
};

Object.defineProperty(window,'score',{
  get:function(){
    return s
  },
  set:function(newval){
    s = newval
    document.querySelector('#ui-score').innerHTML = s
    if(s>500&&s%1000>500){
      var img = new Image()
      img.src = fire1
      GAME.plane.bulletIcon = img
      GAME.plane.atk = 10
    }else if(s>500&&s%1000<500){
      var img = new Image()
      img.src = fire
      GAME.plane.bulletIcon = img
      GAME.plane.atk = 1
    }
  }
})
export default  GAME