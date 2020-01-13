<template>
  <div class="addmaterialfunc">
    <div class="functitle">素材库</div>
    <div class="piclibrary">
      <div class="pictype">
        <a class="inputbox active"><em class="iconfont icon-biankuang"></em> <p>边框</p></a>
        <a class="inputbox"><em class="iconfont icon-xingzhuang1"></em> <p>形状</p></a>
        <a class="inputbox"><em class="iconfont icon-xian"></em> <p>线条</p></a>
        <a class="inputbox"><em class="iconfont icon-icon-elements"></em> <p>图标</p></a>
        <a class="inputbox"><em class="iconfont icon-intention-1-copy"></em> <p>商务</p></a>
      </div>
      <div class="picbox">
        <ul>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "materials"
    }
</script>

<style scoped>
.addmaterialfunc {
  width: 280px
}

.addmaterialfunc .functitle {
  display: block;
  width: 100%;
  height: 44px;
  line-height: 44px;
  color: #a2a2a2;
  background: #333;
  font-size: 16px;
  text-align: center
}

.addmaterialfunc .piclibrary {
  overflow: hidden
}

.addmaterialfunc .piclibrary .pictype {
  width: 240px;
  max-height: 110px;
  margin: 10px auto;
  overflow: hidden;
  overflow-y: auto
}

.addmaterialfunc .piclibrary .pictype a {
  float: left;
  width: 44px;
  height: 44px;
  margin: 5px 8px;
  background: #2e2e2f;
  border: 1px solid #2e2e2f;
  border-radius: 4px;
  color: #a2a2a2
}

.addmaterialfunc .piclibrary .pictype a em {
  display: block;
  margin: 5px 0 3px;
  font-size: 18px;
  text-align: center
}

.addmaterialfunc .piclibrary .pictype a p {
  display: block;
  font-size: 12px;
  text-align: center
}

.addmaterialfunc .piclibrary .pictype a.active, .addmaterialfunc .piclibrary .pictype a:hover {
  border: 1px solid #1bceb3;
  color: #fff
}

.addmaterialfunc .piclibrary .picsubtype {
  width: 260px;
  margin: 10px auto;
  border-top: 1px solid #4a4b4c;
  overflow: hidden;
  overflow-y: auto
}

.addmaterialfunc .piclibrary .picsubtype ul {
  width: 254px;
  max-height: 60px;
  margin: 10px auto;
  overflow: hidden;
  overflow-y: auto
}

.addmaterialfunc .piclibrary .picsubtype li {
  float: left
}

.addmaterialfunc .piclibrary .picsubtype a {
  display: block;
  height: 24px;
  line-height: 24px;
  padding: 0 8px;
  margin: 3px 5px;
  font-size: 12px;
  color: #a2a2a2;
  border-radius: 12px
}

.addmaterialfunc .piclibrary .picsubtype a.active, .addmaterialfunc .piclibrary .picsubtype a:hover {
  color: #fff;
  background: #202021
}

.addmaterialfunc .piclibrary .picbox {
  position: absolute;
  top: 172px;
  bottom: 20px;
  right: 13px;
  width: 244px;
  overflow-y: auto
}

.addmaterialfunc .piclibrary .picbox ul {
  overflow: hidden
}

.addmaterialfunc .piclibrary .picbox li {
  float: left;
  width: 69px;
  height: 69px;
  padding: 5px;
  margin: 5px;
  border: 1px solid #495060
}

.addmaterialfunc .piclibrary .picbox li img {
  display: block;
  width: 100%;
  height: 100%
}

.addmaterialfunc .mypic .nopic img {
  display: block;
  width: 86px;
  height: 74px;
  margin: 30px auto
}

.addmaterialfunc .mypic .nopic p {
  font-size: 14px;
  color: #929497;
  text-align: center
}

.addmaterialfunc .mypic .picwrap {
  position: absolute;
  top: 60px;
  right: 10px;
  width: 247px;
  bottom: 80px;
  overflow: hidden;
  overflow-y: auto
}

.addmaterialfunc .mypic .picwrap ul {
  overflow: hidden
}

.addmaterialfunc .mypic .picwrap li {
  float: left;
  position: relative;
  width: 70px;
  height: 70px;
  margin: 15px 5px;
  overflow: hidden;
  border-radius: 10px
}

.addmaterialfunc .mypic .picwrap li img {
  display: block;
  width: 100%;
  height: 100%
}

.addmaterialfunc .mypic .picwrap li a.deletemypic {
  position: absolute;
  display: none;
  width: 50px;
  height: 50px;
  top: -25px;
  right: -25px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5M0YxRTZGQTRDMUQxMUU3ODg2RUNCQzI1MzJERDY5OCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5M0YxRTZGQjRDMUQxMUU3ODg2RUNCQzI1MzJERDY5OCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjkzRjFFNkY4NEMxRDExRTc4ODZFQ0JDMjUzMkRENjk4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjkzRjFFNkY5NEMxRDExRTc4ODZFQ0JDMjUzMkRENjk4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Q3xT9gAAAJVJREFUeNpi+P//PwMOLAfEZ4HYCpcaJgbcQBaIjYBYHZcCfJp/QOkv5GgmCGim+RmUfoVLAQsQywOxKJT/H0r/A2JtKNsCiD8CMTOSPkYgfs8IDPIHUANIBZ9Amq2ADBkkW2E2qwBxBxD3A/FRJC8ywr2DJ5EI/YcAshKJIpSWHlrxzA6lucnRDEoct4D4IS4FAAEGAMGudPno5UZDAAAAAElFTkSuQmCC) center 32px no-repeat rgba(0, 0, 0, .5);
  transform: rotate(45deg);
  cursor: pointer
}

.addmaterialfunc .mypic .picwrap li:hover a.deletemypic {
  display: block
}

.addmaterialfunc .uploadpic {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0
}

.addmaterialfunc .uploadpic a.uploadbtn {
  display: block;
  width: 240px;
  height: 30px;
  line-height: 30px;
  background: #1bceb3;
  margin: 20px 20px 30px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  color: #fff
}

.addmaterialfunc .piclibrary .picbox .linegroup li {
  width: 96%;
  height: 30px;
  border: 0
}
</style>
