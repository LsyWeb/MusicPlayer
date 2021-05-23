import music from './audio.js';
class Progress {
    constructor() {
        this.timer = null;//定时器
        this.duration = 0;//总时长
        this.width = 0;//进度条播放的长度

        this.getDom();// 获取进度条相关元素
        this.init(0);
    }
    // 获取进度条相关元素
    getDom() {
        this.curTime = document.querySelector('.curTime');
        this.totalTime = document.querySelector('.totalTime');
        this.drag = document.querySelector('.drag');
        this.circle = document.querySelector('.circle');
        this.front = document.querySelector('.frontBg');
        this.backBg = document.querySelector('.backBg');
    }
    // 换算时间
    getTime(time) {  //time单位为秒
        let m = Math.floor(time / 60);
        let s = Math.round(time % 60);
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        return `${m}:${s}`;
    }
    // 进度条初始化
    async init(index) {
        const data = await fetch('../mock/data.json').then(resp => resp.json());
        this.duration = data[index].duration;
        this.curTime.innerHTML = this.getTime(0);
        this.totalTime.innerHTML = this.getTime(this.duration)
        this.circle.style.transform = 'translateX(0)';
        this.front.style.width = 0 + 'px';
    }
    // 开始播放
    proPlay() {
        clearInterval(this.timer);
        this.curTime.innerHTML = this.getTime(music.audio.currentTime);
        this.timer = setInterval(() => {
            // music.audio.currentTime 有误差 0.93 所以要用round 向上取整
            this.curTime.innerHTML = this.getTime(music.audio.currentTime);

            this.width = Math.round(music.audio.currentTime) / this.duration * this.drag.clientWidth;

            this.circle.style.transform = `translateX(${this.width}px)`;
            this.front.style.width = Math.round(music.audio.currentTime) / this.duration * 100 + '%';
        }, 1000);
    }
    // 停止播放
    proStop() {
        clearInterval(this.timer);
    }
}
class Drag {
    // 拖拽
    constructor(obj) {
        this.obj = obj; //要拖拽的元素
        this.startPointX = 0; //拖拽按下时的位置
        this.startLeft = 0; //按下时已经走的距离
        this.percent = 0; //拖拽的百分比
        this.init();
    }
   

    init(){
        // 拖拽按下
        this.obj.addEventListener('touchstart',(e) =>{
            // changedTouches 触发当前事件的手指列表
            this.startPointX = e.changedTouches[0].pageX;   //拖拽按下时的位置
            this.startLeft = parseFloat(this.obj.style.transform.split('(')[1]);    //按下时元素离左边的距离

            this.start && this.start();
        })
        // 开始拖拽
        this.obj.addEventListener('touchmove',(e) =>{
            this.disPointX = e.changedTouches[0].pageX - this.startPointX; //拖动的距离
            
            let l = this.disPointX + this.startLeft; //小圆点要走的距离
            if(l < 0){
                l = 0;
            }else if(l > this.obj.offsetParent.offsetWidth){
                l = this.obj.offsetParent.offsetWidth;
            }

            this.obj.style.transform = `translateX(${l}px)`;
            document.querySelector('.frontBg').style.width = l + 'px';
            // 计算百分比
            this.percent = l / this.obj.offsetParent.offsetWidth;
            this.end && this.move(this.percent);
            e.preventDefault();
        })
        // 拖拽结束
        this.obj.addEventListener('touchend',(e) =>{
            this.end && this.end(this.percent);
        })
    }

}
function getDrag(obj) {
    return new Drag(obj)
}
export default {
    pro: new Progress(),
    drag: getDrag
}