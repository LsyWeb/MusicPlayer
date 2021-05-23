import '../css/index.less';
import render from './render.js';
import music from './audio.js';
import Index from './indexControl.js';
import listControl from './listControl.js';
import progress from './progress.js';

class MusicPlayer {
    constructor(dom) {
        this.wrap = dom;         //容器
        this.dataList = [];      //请求到的数据
        // this.now = 0;            //现在播放的歌曲的索引
        this.indexObj = null;
        this.rotateTimer = null; //图片旋转的定时器
        this.deg = 0;            //图片旋转的角度
        this.curIndex = null;    //当前播放歌曲的索引值
    }
    init() {
        this.getDom();
        this.getdata('../mock/data.json');
    }
    // 获取dom元素
    getDom() {
        this.recond = document.querySelector('.songImg img');   //歌曲图片
        this.controlBtns = document.querySelectorAll('.control li');    //按钮组
    }
    // 获取渲染数据
    async getdata(url) {
        this.dataList = await fetch(url).then(resp => resp.json());
        this.listPlay();
        this.indexObj = new Index(this.dataList.length);

        // this.loadMusic(this.now);
        this.loadMusic(this.indexObj.index);
        this.musicControl();
        this.proDrag()
    }
    // 加载音乐
    loadMusic(index) {
        render(this.dataList[index]);
        music.load(this.dataList[index].audioSrc);
        progress.pro.init(index);

        if (music.status === 'play') {
            music.play();
            this.controlBtns[2].className = 'playing';
            this.imgRotate(this.deg); //旋转图片

            progress.pro.proPlay();
        }

        this.list.changeSelect(index);  //把歌曲列表的选中歌曲 和 现在加载的歌曲统一

        this.curIndex = index;      //存储 当前加载的歌曲的对应索引值
        // 当音乐播放完成要切歌
        music.end(() => {
            this.loadMusic(this.indexObj.next());
        })
    }
    // 控制音乐
    musicControl() {
        // 上一首
        this.controlBtns[1].addEventListener('touchend', () => {
            music.status = 'play';
            // this.now--;
            // this.loadMusic(this.now);  
            this.loadMusic(this.indexObj.prev());   //加载上一首歌曲
            this.deg = 0;   //切歌后，图片的旋转角度要变成0


        })
        // 播放/暂停
        this.controlBtns[2].addEventListener('touchend', () => {
            if (music.status === 'play') {
                music.pause();
                this.controlBtns[2].className = '';
                this.imgStop();
                progress.pro.proStop();//进度条定时器关闭
            } else {
                music.play();
                this.controlBtns[2].className = 'playing';
                this.imgRotate(this.deg)
                progress.pro.proPlay();//进度条定时器开启
            }
        })
        // 下一首
        this.controlBtns[3].addEventListener('touchend', () => {
            music.status = 'play';
            // this.now++;
            // this.loadMusic(this.now);
            this.loadMusic(this.indexObj.next());       //加载下一首歌曲
            this.deg = 0;   //切歌后，图片的旋转角度要变成0

        })
    }
    // 旋转图片
    imgRotate(deg) {
        clearInterval(this.rotateTimer);

        this.rotateTimer = setInterval(() => {
            deg = +this.deg + 0.2;
            this.recond.style.transform = `rotate(${deg}deg)`;  //图片旋转
            this.deg = deg; //把上一次旋转的角度存起来，方便暂停后再次播放时能获取到上一次的旋转角度
        }, 1000 / 60);
    }
    // 停止旋转图片
    imgStop() {
        clearInterval(this.rotateTimer);
    }
    // 列表切歌
    listPlay() {
        this.list = listControl(this.dataList, this.wrap);

        // 列表按钮点击事件
        this.controlBtns[4].addEventListener('touchend', () => {
            this.list.slideUp();
        })
        // 列表关闭按钮点击事件
        document.querySelector('.close').addEventListener('touchend', () => {
            this.list.slideDown();
        })
        // 列表歌曲注册事件
        this.list.musicList.forEach((item, index) => {
            item.addEventListener('touchend', () => {
                if (this.curIndex == index) {
                    return;
                }
                music.status = 'play';
                this.indexObj.index = index;
                this.loadMusic(index);
                this.list.slideDown();
            })
        })
    }
    // 进度条拖拽
    proDrag() {
        const circle = progress.drag(document.querySelector('.circle'));
        circle.init();

        // 拖拽按下
        circle.start = (pre) => {

        };

        // 拖拽中
        circle.move = (pre) => {
            music.pause();
            this.controlBtns[2].className = '';
            this.imgStop();
            progress.pro.proStop();//进度条定时器关闭
        };

        // 拖拽结束
        circle.end = (pre) => {
            music.audio.currentTime = music.audio.duration * pre;
            music.play();
            this.controlBtns[2].className = 'playing';
            this.imgRotate(this.deg)
            progress.pro.proPlay();//进度条定时器开启
        }
    }

}
const musicPlayer = new MusicPlayer(document.querySelector('#wrap'));
musicPlayer.init();