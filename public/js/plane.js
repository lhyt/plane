
var Plane=function(opts){
    var opts = opts || {};
    Element.call(this,opts);

    this.status='normal';
    this.icon=opts.icon;

    //bullet
    this.bullets=[];
    this.bulletSize=opts.bulletSize;
    this.bulletSpeed=opts.bulletSpeed;
    this.bulletIcon=opts.bulletIcon;
    /*this.shootSound=opts.shootSound;*/

    //boom
    this.boomIcon=opts.boomIcon;
    this.boomCount=0;
};

//继承Element方法
Plane.prototype=new Element();

Plane.prototype.hasCrash = function(target){
    var crash=false;

    if(!(this.x+this.width-10<target.x)&&//是否碰撞
    !(target.x+target.width-10<this.x)&&
    !(this.y+this.height-10<target.y)&&
    !(target.y+target.height-10<this.y)){
        crash = true;
    }
    return crash;
};


//判断是否击中

Plane.prototype.hasHit =  function(target){
    var bullets  = this.bullets;
    var hasHit = false;
    for (var j = bullets.length-1; j>=0; j--) {
        //子弹击中目标，销毁子弹   
        if (bullets[j].hasCrash(target)){
            //清除子弹实例
            this.bullets.splice(j,1);
            hasHit =  true;
            break;
        }
    }
    return hasHit;
};

//修改飞机当前位置 
Plane.prototype.setPosition = function(newPlaneX,newPlaneY){
    this.x=newPlaneX;
    this.y=newPlaneY;
    return this;
}

//射击
Plane.prototype.startShoot=function(){
    var self = this;
    var bulletWidth = this.bulletSize.width;
    var bulletHeight=this.bulletSize.height;

    //定时发射
    this.shootingInterval=setInterval(function(){
        //创建居中射出的子弹
        var bulletX=self.x+self.width/2-bulletWidth/2;
        var bulletY=self.y-bulletHeight;
        //创建子弹
        self.bullets.push(new Bullet({
            x:bulletX,
            y:bulletY,
            width:bulletWidth,
            height:bulletHeight,
            speed:self.bulletSpeed, 
            icon:self.bulletIcon,
        }));
    },20);//发射速度
};


//绘制子弹
Plane.prototype.drawBullets=function(){
    var bullets=this.bullets;
    var i=bullets.length;
    while(i--){
        var bullet=bullets[i];
        //更新位置+绘制
        bullet.fly();
        //子弹越界删去
        if(bullet.y<=0){
            bullets.splice(i,1);
        }else{
            bullet.draw();
        }
    }
};

//booming
Plane.prototype.booming=function(){
    this.status = 'booming';
    this.boomCount +=1;
    if(this.boomCount>10){
        this.status = 'boomed';
        clearInterval(this.shooting);
    }
    return this;
}


//draw()
Plane.prototype.draw=function(){
//plane
    switch (this.status) {
        case 'booming':
            context.drawImage(this.boomIcon,this.x,this.y,this.width,this.height);
            break;
        default:
            context.drawImage(this.icon,this.x,this.y,this.width,this.height)
            break;
    }
//画出子弹
this.drawBullets();
return this;
};