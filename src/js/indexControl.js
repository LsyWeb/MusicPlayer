class Index {
    constructor(len) {
        this.index = 0;
        this.len = len;
    }

    // 上一首
    prev() {
        return this.get(-1);
    }
    // 下一首
    next() {
        return this.get(1);
    }
    // 获取index
    get(val) {
        this.index = (this.index + val + this.len) % this.len;
        return this.index;
    }
}
export default Index;