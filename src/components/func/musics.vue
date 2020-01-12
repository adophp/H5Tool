<template>
  <div class="addmusicfunc">
    <div class="functitle">音乐</div>
    <audio id="audioClass" loop="loop" :src="musicUrl"></audio>
    <div class="mymusic" style="">
      <div class="checkedmusic">
        <a id="checkedmusicplaying" class="checkedmusicplaying" @click="playMusic"><img src="../../assets/images/bofang.gif"></a>
        <i id="checkedmusicstop" class="iconfont icon-laba" @click="playMusic"></i>
        <span>{{music.name?music.name:'暂无音乐'}}</span>
        <a class="iconfont icon-shanchu" v-if="music.url!=''" @click="deleteProjectBgMusic"></a>
      </div>
      <div class="musicwrap">
        <ul>
          <li v-for="(item, key) in musicList" :key="key" :class="{'active': pIndex==key}">
            <a class="deletemusic iconfont icon-shanchu" @click="deleteMusic(key)"></a>
            <p>{{item.name}}</p>
            <a class="addmusic iconfont icon-tianjia1" @click="setBgMusic(item)"></a>
            <a class="playmusic iconfont" @click="playItem(key, item)" :class="{'icon-zantingbofang':pIndex==key&&playState, 'icon-bofang':pIndex!=key||!playState}"></a>
            <a class="playing" v-if="pIndex==key&&playState"><img src="../../assets/images/playing.gif" @click="playItem(item)"></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="uploadmusic">
      <a class="pictip">支持mp3，建议不超过1M</a>
      <el-upload
        :action="config.upload"
        name="fileupload"
        multiple
        :show-file-list="showFileList"
        accept="audio/*"
        :on-success="handleSuccess">
        <a class="uploadbtn">上传音乐</a>
        <div slot="tip" class="el-upload__tip"></div>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  name: "musics",
  props: {
    initMusicList: {
      type: Array,
      default: []
    },
    bgMusic: {
      type: Object,
      default: {
        name: '',
        url: ''
      }
    },
    preview: {
      type: Boolean,
      default: false
    }
  },
  data() {
      return {
        showFileList: false,
        musicList: this.initMusicList,
        music: this.bgMusic,
        musicUrl: '',
        pIndex: 99999,
        playState: false
      }
  },
  methods: {
    deleteMusic(index){
      var data = this.musicList[index]
      this.$confirm(`确定移除 ${ data.name }？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.musicList.splice(index, 1);
        this.$emit('setMusicList', JSON.stringify(this.musicList))
      }).catch(() => {
        //
      });
    },
    handleSuccess(response, file, fileList){
      if (response.code == 10000) {
        this.musicList.push({name: response.result.file_name, url: response.result.file_path})
        this.$message.success('上传成功')
      }else{
        this.$message.error(response.message)
      }
    },
    setBgMusic(item) {
      this.music = item;
      this.$emit('setBgMusic', item);
    },
    playMusic(){
      var e = document.getElementById('audioClass'), i = document.getElementById('checkedmusicplaying'), j = document.getElementById('checkedmusicstop');
      if (this.playState) {
        e.pause();
        e.src = '';
        this.playState = false;
      }
      if (this.music.name == '') {
        i.style.display = "none", j.style.display = 'inline-block'
      }else {
        if (e.getAttribute('src') == '') {
          e.src = this.music.url;
          e.load()
        }

        e.paused ? (e.play(), i.style.display = "inline-block", j.style.display = 'none') : e.pause && (e.currentTime = 0, e.pause(), i.style.display = "none", j.style.display = 'inline-block')
      }
    },
    deleteProjectBgMusic(){
      var e = document.getElementById('audioClass');
      if (e.getAttribute('src') == this.music.url) {
        e.paused ? e.src='' : (e.pause(),e.src='');
      }
      var empt = {name: '', url: ''};
      this.music = empt;
      this.$emit('setBgMusic', empt);
      this.playMusic()
    },
    playItem(key, item){
      var e = document.getElementById('audioClass');
      if (key == this.pIndex) {
        e.paused ? (e.play(),this.playState=true) : (e.pause(),this.playState=false);
      }else {
        this.pIndex = key;
        e.paused ? e.src = '' : (e.pause(), e.src = '');
        e.src = item.url;
        e.load();
        e.play();
        this.playState=true;
      }
    }
  },
  watch: {
    preview: {
      handler(newValue, oldValue) {
        if (newValue) {
          var e = document.getElementById('audioClass'), i = document.getElementById('checkedmusicplaying'), j = document.getElementById('checkedmusicstop');
          e.paused ? '' : e.pause && (e.currentTime = 0, e.pause(), i.style.display = "none", j.style.display = 'inline-block');
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
  .addmusicfunc {
    width: 280px
  }

  .addmusicfunc .functitle {
    overflow: hidden;
    height: 44px;
    line-height: 44px;
    background: #333;
    font-size: 16px;
    color: #a2a2a2;
    text-align: center
  }

  .addmusicfunc .functitle a.active {
    color: #fff;
    background: #404040
  }

  .addmusicfunc .checkedmusic {
    width: 240px;
    height: 30px;
    margin: 20px auto;
    line-height: 30px;
    font-size: 12px;
    border-radius: 4px;
    background: #373839;
    overflow: hidden
  }
  .addmusicfunc .checkedmusic .checkedmusicplaying {
    display: none;
    float: left;
    margin: 0 5px;
  }
  .addmusicfunc .checkedmusic .checkedmusicplaying img {
    margin: 7px;
  }

  .addmusicfunc .checkedmusic i {
    float: left;
    width: 30px;
    height: 30px;
    line-height: 30px;
    color: #1bceb3;
    text-align: center;
    margin: 0 5px
  }

  .addmusicfunc .checkedmusic span {
    float: left;
    height: 30px;
    line-height: 30px;
    color: #1bceb3;
    width: 170px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }

  .addmusicfunc .checkedmusic a {
    float: right;
    width: 30px;
    height: 30px;
    line-height: 30px;
    color: #a2a2a2;
    font-size: 12px;
    text-align: center
  }

  .addmusicfunc .mymusic .musicwrap {
    position: absolute;
    top: 130px;
    left: 0;
    right: 0;
    bottom: 110px;
    margin: 0 auto;
    overflow: hidden;
    overflow-y: auto
  }

  .addmusicfunc .mymusic .musicwrap li {
    overflow: hidden;
    height: 30px;
    font-size: 12px
  }

  .addmusicfunc .mymusic .musicwrap li:nth-child(odd) {
    background: #373839
  }

  .addmusicfunc .mymusic .musicwrap li p {
    float: left;
    overflow: hidden;
    height: 30px;
    line-height: 30px;
    /*text-indent: 30px;*/
    color: #a2a2a2;
    max-width: 170px;
    text-overflow: ellipsis;
    white-space: nowrap
  }

  .addmusicfunc .mymusic .musicwrap li a {
    float: right;
    width: 20px;
    height: 30px;
    margin: 0 3px;
    line-height: 30px;
    text-align: center;
    color: #a2a2a2;
    font-size: 12px
  }

  .addmusicfunc .mymusic .musicwrap li:hover {
    background: #1bceb3
  }

  .addmusicfunc .mymusic .musicwrap li.active a, .addmusicfunc .mymusic .musicwrap li:hover a {
    color: #fff
  }

  .addmusicfunc .mymusic .musicwrap li.active p, .addmusicfunc .mymusic .musicwrap li:hover p {
    float: left;
    overflow: hidden;
    width: 190px;
    height: 30px;
    line-height: 30px;
    text-indent: 0;
    color: #fff;
    text-overflow: ellipsis;
    white-space: nowrap
  }

  .addmusicfunc .uploadmusic {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0
  }

  .addmusicfunc .uploadmusic a.uploadbtn {
    display: block;
    width: 240px;
    height: 30px;
    line-height: 30px;
    background: #1bceb3;
    margin: 20px auto 30px;
    border-radius: 4px;
    font-size: 14px;
    text-align: center;
    color: #fff
  }
  .addmusicfunc .uploadmusic a.pictip {
    display: block;
    text-align: center;
    color: #a2a2a2;
    font-size: 14px
  }

  .addmusicfunc .uploadmusic a.pictip:hover {
    color: #1bceb3
  }
  .uploadmusic /deep/ .el-upload {
    display: block;
  }

  .addmusicfunc .mymusic .musicwrap li a.deletemusic {
    visibility: hidden;
    float: left;
    width: 30px;
    margin: 0
  }

  .addmusicfunc .mymusic .musicwrap li:hover a.deletemusic {
    visibility: visible;
  }

</style>
