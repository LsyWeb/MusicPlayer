import blurImg from './gaussBlur.js';
// 渲染图片
function renderImg(src){
    blurImg(src);
    const img = document.querySelector('.songImg img');
    img.src = src;
}
// 渲染歌曲信息
function renderInof(info){
    const singer = document.querySelector('.singer');
    const name = document.querySelector('.name');
    const album = document.querySelector('.album');
    singer.innerHTML = info.singer;
    name.innerHTML = info.name;
    album.innerHTML = info.album;
}
// 渲染是否喜欢
function renderIslike(isLike){
    const lis = document.querySelectorAll('.control li');
    lis[0].className = isLike ? 'liking':'';
}
export default function render(data){
    renderImg(data.image);
    renderInof(data);
    renderIslike(data.isLike);
}
