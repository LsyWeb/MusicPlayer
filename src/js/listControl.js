import music from "./audio";

function listControl (data,wrap) {
    let list = document.createElement('div'),
        dl = document.createElement('dl'),
        dt = document.createElement('dt'),
        close = document.createElement('div'),
        musicList = [];
    
    list.className = 'list';
    dt.innerHTML = '播放列表';
    close.className = 'close';
    close.innerHTML = '关闭';
    dl.appendChild(dt);

    data.forEach((item,index) =>{
        let dd = document.createElement('dd');
        dd.innerHTML = `${item.name}`;

        dd.addEventListener('touchend',()=>{
            changeSelect(index);
        })

        dl.appendChild(dd);
        musicList.push(dd);
    })
    list.appendChild(dl);
    list.appendChild(close);
    wrap.appendChild(list);

    changeSelect(0);    //默认让第一首歌成为选中状态

    const disY = list.offsetHeight;
    list.style.transform = `translateY(${disY}px)`;
    // 滑出
    function slideUp(){
        list.style.transition = '.3s';
        list.style.transform = `translateY(0px)`;
    }
    // 隐藏
    function slideDown(){
        list.style.transition = '.3s';
        list.style.transform = `translateY(${disY}px)`;
    }
    // 切换选中的元素
    function changeSelect(index){
        for(let i = 0; i < musicList.length; i++){
            musicList[i].className = '';
        }
        musicList[index].className = 'active';
    }
    return {
        musicList,
        slideUp,
        slideDown,
        changeSelect
    }
}
export default listControl;