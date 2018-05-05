let dragModal = (() => {
    let box = document.getElementById("loginBox"),
        loginTitle = box.getElementsByTagName('h3')[0];

    let maxL = (document.documentElement.clientWidth || document.body.clientWidth) - box.offsetWidth,
        maxT = (document.documentElement.clientHeight || document.body.clientHeight) - box.offsetHeight;

    let down = function (e) {
        e = e || window.event;
        //记录鼠标起始位置和盒子的起始位置
        this.strX = e.clientX;
        this.strY = e.clientY;
        this.strL = box.offsetLeft;
        this.strT = box.offsetTop;
        //按下代表拖拽开始
        //setCapture和releaseCapture不兼容谷歌浏览器
        if(this.setCapture){
            this.onmousemove = move;
            this.onmouseup = up;
            this.setCapture();
            return;
        }

        //绑定给document，问题：此时move和up方法中的this不再是loginTitle
        document.onmousemove = e => {
            move.call(this, e);
        };
        document.onmouseup = e => {
            up.call(this, e);
        };

    }

    let move = function (e) {
        e = e || window.event;
        var curL = e.clientX - this.strX + this.strL;
        var curT = e.clientY - this.strY + this.strT;

        curL = curL < 0 ? 0 : (curL > maxL ? maxL : curL);
        curT = curT < 0 ? 0 : (curT > maxT ? maxT : curT);
        box.style.left = curL + "px";
        box.style.top = curT + "px";
    }

    let up = function (e) {
        if(this.releaseCapture){
            this.onmousemove = null;
            this.onmouseup = null;
            this.releaseCapture();
            return;
        }
        //移除DOC上面的方法
        document.onmousemove = null;
        document.onmouseup = null;
    }

    let init = () => {
        box.style.left = maxL / 2 + 'px';
        box.style.top = maxT / 2 + 'px';

        loginTitle.onmousedown = down;
    }
    return {
        init: init
    }
})();

dragModal.init();