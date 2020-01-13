<template>
  <div class="addpicfunc">
    <div class="functitle"><a>视频</a></div>
    <div class="mypic">
      <div class="picwrap">
        <div class="mypicwrap">
          <div class="mypicitem">
            <div class="nopic" v-if="videoList.length == 0">
              <p><i class="iconfont icon-zanwushuju"></i></p>
              <p>暂无视频</p>
            </div>
            <ul v-else>
              <li v-for="(item, key) in videoList" :key="key" @click="addPageVideo(item)">
                <img :src="item.thumb">
                <span class="duration">{{item.duration}}</span>
                <a class="deletemypic" @click.stop="deletePic(key)"><i class="iconfont icon-tianjia1"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="uploadpic">
      <a class="pictip">支持mp4，建议不超过10M</a>
      <el-upload
        :action="config.upload"
        name="fileupload"
        multiple
        :show-file-list="showFileList"
        accept="audio/mp4,video/mp4"
        :on-success="handleSuccess">
        <a class="uploadbtn">上传视频</a>
        <div slot="tip" class="el-upload__tip"></div>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  name: "videos",
  props: {
    npage: {
      type: Number,
      default: 0
    },
    initVideoList: {
      type: Array,
      default: []
    }
  },
  data() {
      return {
        videoList: this.initVideoList,
        showFileList: false,
        video: {
          id: 0,
          type: 'video',
          name: '视频',
          value: '',
          x: 50,
          y: 100,
          width: 300,
          height: 50,
          borderRadius: 0,
          borderWidth: 0,
          borderColor: 'rgb(0, 0, 0);',
          borderStyle: 'solid',
          color: 'rgb(103, 103, 103);',
          ani: '',
          duration: 1,
          delay: 1,
          iteration: '1',
          opacity: 1,
          rotate: 0,
          lineHeight: 1,
          letterSpacing: 0,
          fontFamily: 'SimHei',
          fontSize: 32,
          fontBold: false,
          fontStyle: false,
          textDecoration: false,
          textAlign: '',
          backgroundColor: '',
          zIndex: 0,
          active: true,
          isVisible: true,
          isActive: false,
          handles: ['tl','tm','tr','mr','br','bm','bl','ml'],
        },
      }
  },
  methods: {
    deletePic(index){
      var data = this.videoList[index]
      this.$confirm(`确定移除 ${ data.name }？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.videoList.splice(index, 1);
        this.$emit('setVideoList', JSON.stringify(this.videoList))
      }).catch(() => {
        //
      });
    },
    handleSuccess(response, file, fileList){
      if (response.code == 10000) {
        this.videoList.push({name: response.result.file_name, url: response.result.file_path, thumb: response.result.thumb, width: response.result.width, height: response.result.height, duration: response.result.duration})
        this.$message.success('上传成功')
      }else{
        this.$message.error(response.message)
      }
    },
    addPageVideo(item) {
      var old = JSON.stringify(this.video);
      var ele = JSON.parse(old);
      ele.value = item.url;
      ele.width = item.width;
      ele.height = item.height;
      this.$emit('addMethods', JSON.stringify(ele));
    }
  }
}
</script>

<style scoped>
  .addpicfunc {
    width: 280px
  }

  .addpicfunc .functitle {
    overflow: hidden;
    height: 44px;
    line-height: 44px;
    background: #333;
    font-size: 16px;
    color: #a2a2a2;
    text-align: center
  }

  .addpicfunc .piclibrary .pictype a {
    float: left;
    width: 44px;
    height: 44px;
    margin: 5px 7px;
    background: #2e2e2f;
    border: 1px solid #2e2e2f;
    border-radius: 4px;
    color: #a2a2a2
  }

  .addpicfunc .piclibrary .pictype a em {
    display: block;
    margin: 5px 0 3px;
    font-size: 18px;
    text-align: center
  }

  .addpicfunc .piclibrary .pictype a p {
    display: block;
    font-size: 12px;
    text-align: center
  }

  .addpicfunc .piclibrary .picsubtype ul {
    width: 254px;
    max-height: 60px;
    margin: 10px auto;
    overflow: hidden;
    overflow-y: auto
  }

  .addpicfunc .piclibrary .picsubtype li {
    float: left
  }

  .addpicfunc .piclibrary .picsubtype a {
    display: block;
    height: 24px;
    line-height: 24px;
    padding: 0 8px;
    margin: 3px 5px;
    font-size: 12px;
    color: #a2a2a2;
    border-radius: 12px
  }

  .addpicfunc .piclibrary .picsubtype a:hover {
    color: #fff;
    background: #202021
  }

  .addpicfunc .piclibrary .picbox ul {
    overflow: hidden
  }

  .addpicfunc .piclibrary .picbox li {
    float: left;
    width: 69px;
    height: 69px;
    padding: 5px;
    margin: 5px;
    border: 1px solid #495060
  }

  .addpicfunc .piclibrary .picbox li img {
    display: block;
    width: 100%;
    height: 100%
  }

  .addpicfunc .mypic .nopic img {
    display: block;
    width: 86px;
    height: 74px;
    margin: 30px auto
  }

  .addpicfunc .mypic .nopic p {
    font-size: 14px;
    color: #929497;
    text-align: center
  }

  .addpicfunc .mypic .picwrap .mypicwrap .picfile a {
    float: left;
    position: relative;
    width: 60px;
    height: 70px;
    overflow: hidden
  }

  .addpicfunc .mypic .picwrap .mypicwrap .picfile a img {
    display: block;
    height: 40px;
    width: 46px;
    margin: 3px auto
  }

  .addpicfunc .mypic .picwrap .mypicwrap .picfile a p {
    width: 56px;
    height: 24px;
    margin: 0 auto;
    line-height: 24px;
    text-align: center;
    font-size: 12px;
    color: #8b8b8b;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }

  .addpicfunc .mypic .picwrap .mypicwrap .picfile a.openfile p {
    color: #fff
  }

  .addpicfunc .mypic .picwrap .mypicwrap .picfile a input {
    position: absolute;
    display: block;
    width: 56px;
    height: 24px;
    line-height: 24px;
    border: 0;
    margin: 0;
    padding: 0;
    background: #2e2e2f;
    color: #fff;
    text-align: center;
    font-size: 12px;
    bottom: 0;
    left: 2px
  }

  .addpicfunc .mypic .picwrap .mypicwrap .picfile .editfile a {
    display: block;
    width: 90px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #979797;
    font-size: 14px;
    background: #494b4d
  }

  .addpicfunc .mypic .picwrap .mypicwrap .picfile .editfile a:hover {
    color: #1bceb3;
    background: #3a3a3a
  }

  .addpicfunc .mypic .picwrap .mypicwrap .mypicitem {
    position: absolute;
    top: 60px;
    bottom: 110px;
    right: 15px;
    width: 246px;
    overflow-y: auto
  }
  .addpicfunc .mypic .picwrap .mypicwrap .mypicitem .nopic p {
    margin: 30px 0 0;
  }
  .addpicfunc .mypic .picwrap .mypicwrap .mypicitem .nopic .iconfont {
    font-size: 80px;
  }

  .addpicfunc .mypic .picwrap ul {
    overflow: hidden
  }

  .addpicfunc .mypic .picwrap li {
    float: left;
    position: relative;
    width: 108px;
    height: 108px;
    margin: 5px;
    background: transparent;
    overflow: hidden;
    border: 1px solid #495060;
    text-align: center;
  }

  .addpicfunc .mypic .picwrap li a.deletemypic {
    position: absolute;
    display: none;
    width: 50px;
    height: 50px;
    top: -25px;
    right: -25px;
    background: rgba(0, 0, 0, .5);
    transform: rotate(45deg);
    cursor: pointer;
    color: #fff;
  }
  .addpicfunc .mypic .picwrap li a.deletemypic i {
    position: absolute;
    left: 18px;
    bottom: 4px;
  }

  .addpicfunc .mypic .picwrap li:hover a.deletemypic {
    display: block
  }

  .addpicfunc .uploadpic {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0
  }

  .addpicfunc .uploadpic a.uploadbtn {
    display: block;
    width: 240px;
    height: 30px;
    line-height: 30px;
    background: #1bceb3;
    border-radius: 4px;
    margin: 20px auto 30px;
    font-size: 14px;
    text-align: center;
    color: #fff
  }

  .addpicfunc .uploadpic a.pictip {
    display: block;
    text-align: center;
    color: #a2a2a2;
    font-size: 14px
  }

  .addpicfunc .uploadpic a.pictip:hover {
    color: #1bceb3
  }
  .addpicfunc .mypic .picwrap li img {
    display: inline-block;
    max-width: 100%;
    max-height: 100%;
    margin: 0 auto;
  }
  .uploadpic /deep/ .el-upload {
    display: block;
  }
  .addpicfunc .mypic .picwrap li .duration {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 0 5px;
    color: #fff;
    font-size: 12px;
  }
</style>
