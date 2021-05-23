class AudioManage{
    constructor(){
        this.audio = new Audio();  //创建一个audio实例
        this.status = 'pause';  //播放状态
    }
    // 加载音乐
    load(src){
        this.audio.src = src;
        this.audio.load();  //加载音乐
    }
    // 播放音乐
    play(){
        this.audio.play();
        this.status = 'play';
    }
    // 暂停播放
    pause(){
        this.audio.pause();
        this.status = 'pause';
    }
    // 音乐播放完成事件
    end(fn){
        this.audio.onended = fn;
    }
    // 跳到音乐的某个时间点
    playTo(time){
        this.audio.currentTime = time;  //单位为秒
    }
}
const music = new AudioManage();
export default music;