/**
 * 游戏相关配置
 * @type {Object}
 */
var CONFIG = {
  planeSize: {
    width: 60,
    height: 45
  }, 
  planeType: 'bluePlaneIcon', // 默认是蓝色
  bulletSize: {
    width: 20,
    height: 20
  },
  enemySpeed: 4, // 默认敌人移动距离
  enemyMaxNum: 12, // 敌人最大梳理
  enemySmallSize: {
    width: 54,
    height: 40
  },
  enemyBigSize: {
    width: 130,
    height: 100
  },
  enemyBossSize: {
    width: 350,
    height: 280
  },
  enemyFastSize: {
    width: 100,
    height: 80
  },
  enemyuSize: {
    width:400,
    height: 400
  },
  bulletSpeed: 10, // 默认子弹的移动速度
  resources: {
    images: [
      { src: './static/img/plane_1.png',
        name: 'bluePlaneIcon'
      },
      { src: './static/img/plane_2.png',
        name: 'pinkPlaneIcon'
      },
      { src: './static/img/fire.png',
        name: 'fireIcon'
      },
      { src: './static/img/enemy_big.png',
        name: 'enemyBigIcon'
      },
      { src: './static/img/enemy_small.png',
        name: 'enemySmallIcon'
      },
      { src: './static/img/boom_big.png',
        name: 'enemyBigBoomIcon'
      },
      { src: './static/img/boom_small.png',
        name: 'enemySmallBoomIcon'
      },
      { src: './static/img/enemy_boss.png',
      name: 'enemyBossIcon'
      },
      { src: './static/img/plane_2.png',
      name: 'enemyFastIcon'
      },
      { src: './static/img/boom_boss.png',
      name: 'enemyBossBoomIcon'
      },   
      { src: './static/img/enemyu1.png',
      name: 'enemyuIcon'
      },
      { src: './static/img/enemyu.png',
      name: 'enemyuBoomIcon'
      }
      ],
    sounds: [
      { 
        src: './sound/biubiubiu.mp3',
        name: 'shootSound'
      },
      { src: './sound/music.mp3',
        name: 'gameSound'
      },
      { src: './sound/die.mp3',
        name: 'dieSound'
      },
      { src: './sound/button.mp3',
        name: 'buttonSound'
      },
      { src: './sound/boom.mp3',
        name: 'boomSound'
      },
    ]
  }
};