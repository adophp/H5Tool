<template>
  <div class="addpicfunc">
    <div class="functitle">图片</div>
    <div class="mypic" style="">
      <div class="picwrap">
        <div >
          <div class="mypicwrap">
            <div class="mypicitem" v-if="fileList.length > 0">
              <ul >
                  <li v-for="(item, key) in fileList" :key="key" @click="addPagePic(item)">
                    <img :src="item.url" :alt="item.name">
                    <a class="deletemypic" @click.stop="deletePic(key)"><i class="iconfont icon-tianjia1"></i></a>
                  </li>
              </ul>
            </div>
            <div v-else>
              <div class="nopic">
                <p><i class="iconfont icon-zanwutupian"></i></p>
                <p>暂无图片</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="uploadpic">
      <el-upload
        :action="config.upload"
        name="fileupload"
        multiple
        accept="image/gif,image/jpeg,image/jpg,image/png"
        :show-file-list="showFileList"
        :on-success="handleSuccess">
        <a class="uploadbtn">点击上传</a>
        <div slot="tip" class="el-upload__tip"></div>
      </el-upload>
    </div>
  </div>
</template>

<script>
    export default {
      name: "pic",
      props: {
        npage: {
          type: Number,
          default: 0
        },
        initFile: {
          type: Array,
          default: []
        }
      },
      data() {
        return {
          showFileList: false,
          fileList: this.initFile,
          pic: {
            id: 0,
            type: 'img',
            name: '图片',
            value: '',
            x: 50,
            y: 170,
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
        };
      },
      methods: {
        deletePic(index){
          var data = this.fileList[index]
          this.$confirm(`确定移除 ${ data.name }？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.fileList.splice(index, 1)
            this.$emit('setFileList', JSON.stringify(this.fileList))
          }).catch(() => {
            //
          });
        },
        handleSuccess(response, file, fileList) {
          if (response.code == 10000) {
              this.fileList.push({
                name: response.result.file_name,
                url: response.result.file_path,
                width: response.result.width,
                height: response.result.height
              })
              this.$message.success('上传成功')
          }else{
            this.$message.error(response.message)
          }
        },
        addPagePic(item) {
          var old = JSON.stringify(this.pic);
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
  .addpicfunc .mypic .picwrap .mypicwrap .nopic {
    margin-top: 15px;
  }
  .addpicfunc .mypic .picwrap .mypicwrap .nopic .iconfont {
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
    /*background: #e6e6e6;*/
    overflow: hidden;
    border: 1px solid #495060;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .addpicfunc .mypic .picwrap li img {
    max-width: 100%;
    max-height: 100%
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

  .uploadpic /deep/ .el-upload {
    display: block;
  }
  .uploadpic /deep/ .el-upload input {
    display: none;
  }
  .uploadpic /deep/ .el-upload__tip {
    margin-top: 0;
    padding-left: 20px;
    padding-right: 20px;
  }
  .uploadpic /deep/ .el-upload-list {
    margin-top: 0;
    padding-left: 20px;
    padding-right: 20px;
  }
</style>
