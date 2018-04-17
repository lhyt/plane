import plane_1 from './img/plane_1.png'
import plane_2 from './img/plane_2.png'
import fire from './img/fire.png'
import enemy_big from './img/enemy_big.png'
import enemy_small from './img/enemy_small.png'
import boom_big from './img/boom_big.png'
import boom_small from './img/boom_small.png'
import enemy_boss from './img/enemy_boss.png'
import boom_boss from './img/boom_boss.png'
import enemyu1 from './img/enemyu1.png'
import enemyu from './img/enemyu.png'





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
      { src: plane_1,
        name: 'bluePlaneIcon'
      },
      { src: plane_2,
        name: 'pinkPlaneIcon'
      },
      { src: fire,
        name: 'fireIcon'
      },
      { src: enemy_big,
        name: 'enemyBigIcon'
      },
      { src: enemy_small,
        name: 'enemySmallIcon'
      },
      { src: boom_big,
        name: 'enemyBigBoomIcon'
      },
      { src: boom_small,
        name: 'enemySmallBoomIcon'
      },
      { src: enemy_boss,
      name: 'enemyBossIcon'
      },
      { src: plane_2,
      name: 'enemyFastIcon'
      },
      { src: boom_boss,
      name: 'enemyBossBoomIcon'
      },   
      { src: enemyu1,
      name: 'enemyuIcon'
      },
      { src: enemyu,
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

export default  CONFIG