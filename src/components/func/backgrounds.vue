<template>
  <div class="addbackgroundfunc">
    <div class="functitle">背景</div>
    <div class="bgsetting" style="">
      <div class="colorbg"><p>当前背景</p>
        <div class="currentbg clearfix">
          <em class="colorpicker" :style="{backgroundColor: page.backgroundColor==''?'rgb(255, 255, 255)':page.backgroundColor}">
            <el-color-picker color-format="hex" v-model="page.backgroundColor" :popper-class="excludeClassName"></el-color-picker>
          </em>
        </div>
        <p>预设色板</p>
        <em class="initialbg">
          <a class="clearcolor" @click="clearcolor"></a>
          <a v-for="(item,index) in bgColorOption" :key="index" :class="{'active': page.backgroundColor==item.value}" :style="{background: item.value}" @click="setBackgroundColor(item.value)">{{item.label}}</a>
        </em>
      </div>
      <div class="mybg">
        <div class="mybgbox" style="">
          <div class="mybgwrap">
              <div class="nopic" v-if="bgList.length == 0">
                <p><i class="iconfont icon-zanwutupian"></i></p>
                <p>暂无图片</p>
              </div>
            <div v-else>
              <ul>
                <li v-for="(item, k) in bgList" :key="k" @click="setPageBackgroundImage(item)">
                  <img :src="item.url" :alt="item.name">
                  <a class="deletemypic" @click="deletePic(k)"><i class="iconfont icon-tianjia1"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="uploadpic">
        <el-upload
          :action="config.upload"
          name="fileupload"
          multiple
          :show-file-list="showFileList"
          accept="image/gif,image/jpeg,image/jpg,image/png"
          :on-success="handleSuccess">
          <a class="uploadbtn">上传背景</a>
          <div slot="tip" class="el-upload__tip"></div>
        </el-upload>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "backgrounds",
  props: {
    excludeClassName: {
      type: String,
      default: ''
    },
      npage: {
        type: Number,
        default: 0,
      },
      initEle: {
        type: Object,
        default: {
          backgroundColor: '',
          backgroundImage: '',
          musics: '',
          layer: []
        }
      },
      initBgList: {
        type: Array,
        default: []
      }
  },
  data() {
      return {
        page: this.initEle,
        bgColorOption: [
          {
            value: 'rgb(255, 255, 255)',
            label: ''
          },
          {
            value: 'rgb(201, 245, 255)',
            label: ''
          },
          {
            value: 'rgb(203, 222, 255)',
            label: ''
          },
          {
            value: 'rgb(191, 182, 255)',
            label: ''
          },
          {
            value: 'rgb(215, 182, 255)',
            label: ''
          },
          {
            value: 'rgb(239, 191, 221)',
            label: ''
          },
          {
            value: 'rgb(255, 207, 193)',
            label: ''
          },
          {
            value: 'rgb(255, 246, 212)',
            label: ''
          },
          {
            value: 'rgb(226, 239, 195)',
            label: ''
          },
          {
            value: 'rgb(103, 226, 255)',
            label: ''
          },
          {
            value: 'rgb(105, 161, 255)',
            label: ''
          },
          {
            value: 'rgb(106, 85, 255)',
            label: ''
          },
          {
            value: 'rgb(161, 85, 255)',
            label: ''
          },
          {
            value: 'rgb(225, 108, 179)',
            label: ''
          },
          {
            value: 'rgb(255, 131, 95)',
            label: ''
          },
          {
            value: 'rgb(255, 194, 101)',
            label: ''
          },
          {
            value: 'rgb(255, 227, 113)',
            label: ''
          },
          {
            value: 'rgb(192, 224, 115)',
            label: ''
          },
          {
            value: 'rgb(155, 155, 155)',
            label: ''
          },
          {
            value: 'rgb(13, 209, 255)',
            label: ''
          },
          {
            value: 'rgb(15, 103, 255)',
            label: ''
          },
          {
            value: 'rgb(30, 0, 251)',
            label: ''
          },
          {
            value: 'rgb(112, 0, 251)',
            label: ''
          },
          {
            value: 'rgb(221, 22, 144)',
            label: ''
          },
          {
            value: 'rgb(255, 61, 5)',
            label: ''
          },
          {
            value: 'rgb(255, 158, 10)',
            label: ''
          },
          {
            value: 'rgb(255, 209, 24)',
            label: ''
          },
          {
            value: 'rgb(164, 220, 28)',
            label: ''
          },
          {
            value: 'rgb(22, 22, 22)',
            label: ''
          },
          {
            value: 'rgb(0, 66, 180)',
            label: ''
          },
          {
            value: 'rgb(72, 0, 161)',
            label: ''
          },
          {
            value: 'rgb(156, 0, 96)',
            label: ''
          },
          {
            value: 'rgb(172, 0, 0)',
            label: ''
          },
          {
            value: 'rgb(175, 105, 0)',
            label: ''
          },
          {
            value: 'rgb(187, 150, 0)',
            label: ''
          },
        ],
        showFileList: false,
        bgList: this.initBgList
      }
  },
  methods: {
    clearcolor() {
      this.page['backgroundColor'] = '';
      this.$emit('setPageOption', this.npage, 'backgroundColor', '');
    },
    setBackgroundColor(color) {
      this.page['backgroundColor'] = color;
      this.page['backgroundImage'] = '';
      this.$emit('setPageOption', this.npage, 'backgroundColor', color);
    },
    deletePic(index){
      var data = this.bgList[index]
      this.$confirm(`确定移除 ${ data.name }？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.bgList.splice(index, 1)
        this.$emit('setBgList', JSON.stringify(this.bgList))
      }).catch(() => {
        //
      });
    },
    handleSuccess(response, file, fileList) {
      if (response.code == 10000) {
        this.bgList.push({name: response.result.file_name, url: response.result.file_path, width: response.result.width, height: response.result.height})
        this.$message.success('上传成功')
      }else{
        this.$message.error(response.message)
      }
    },
    setPageBackgroundImage(item) {
      this.page['backgroundColor'] = '';
      this.page['backgroundImage'] = item.url;
      this.$emit('setPageOption', this.npage, 'backgroundImage', item.url);
    }
  }
}
</script>

<style scoped>

  .addbackgroundfunc {
    width: 280px
  }

  .addbackgroundfunc .functitle {
    width: 100%;
    height: 44px;
    line-height: 44px;
    background: #333;
    font-size: 14px;
    color: #fff;
    text-align: center
  }

  .addbackgroundfunc .functitle a {
    float: left;
    width: 50%;
    height: 44px;
    line-height: 44px;
    background: #333;
    font-size: 16px;
    color: #a2a2a2;
    text-align: center
  }

  .addbackgroundfunc .functitle a.active {
    color: #fff;
    background: #404040
  }

  .addbackgroundfunc .colorbg {
    width: 240px;
    margin: 10px auto;
    padding-bottom: 20px;
    border-bottom: 1px solid #4a4b4c
  }

  .addbackgroundfunc .colorbg p {
    height: 30px;
    margin: 10px 0 5px;
    line-height: 30px;
    font-size: 14px;
    color: #a2a2a2
  }

  .addbackgroundfunc .colorbg .currentbg {
    height: 20px
  }

  .addbackgroundfunc .colorbg .currentbg .colorpicker {
    float: left;
    width: 80px;
    height: 20px
  }

  .colorpicker /deep/ .el-color-picker__empty, .colorpicker /deep/ .el-color-picker__icon {
    display: none;
  }

  .colorpicker .el-color-picker--small,
  .colorpicker /deep/ .el-color-picker--small .el-color-picker__trigger,
  .colorpicker /deep/ .el-color-picker--small .el-color-picker__color {
    width: 100%;
    height: 20px;
    padding: 0;
    border: 0 none;
  }

  .addbackgroundfunc .colorbg .clearcolor {
    float: left;
    width: 20px;
    height: 20px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDRjE5NzE5M0I2NTYxMUU4QTlFQzlBNDIyNEU5NDJCQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDRjE5NzE5NEI2NTYxMUU4QTlFQzlBNDIyNEU5NDJCQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNGMTk3MTkxQjY1NjExRThBOUVDOUE0MjI0RTk0MkJBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkNGMTk3MTkyQjY1NjExRThBOUVDOUE0MjI0RTk0MkJBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pqIDqAAAAHFJREFUeNqcy0EKwCAMBdEYvJ17l/Ve3sVzdVFKakGQFqPxz3LgORGh/e5SrpwZliTCsPQpMSx9CAzLehiWVjyUJqzJNZ7IBZ7LGW6SSJMq7vI4NDnGRjnAdvnHW/KDd2XHgGwYky+GZc2dMWKy9ggwAGFIhtOQtxbpAAAAAElFTkSuQmCC) no-repeat 50%
  }

  .addbackgroundfunc .colorbg .initialbg, .addbackgroundfunc .colorbg .templatebg {
    display: block;
    overflow: hidden
  }

  .addbackgroundfunc .colorbg .initialbg a, .addbackgroundfunc .colorbg .templatebg a {
    float: left;
    height: 19px;
    width: 19px;
    margin: .5px
  }

  .addbackgroundfunc .colorbg .initialbg a.active {
    top: -1px;
    left: -1px;
    position: relative
  }
  .addbackgroundfunc .mybg .mybgwrap {
    position: absolute;
    top: 280px;
    right: 13px;
    width: 247px;
    overflow-y: auto;
    bottom: 90px;
    background: #363738
  }
  .addbackgroundfunc .mybg .mybgwrap .nopic {
    margin-top: 15px;
  }
  .addbackgroundfunc .mybg .mybgwrap .nopic .iconfont {
    font-size: 80px;
  }

  .addbackgroundfunc .imagebg ul, .addbackgroundfunc .mybg ul, .addbackgroundfunc .recommendbg ul {
    overflow: hidden
  }

  .addbackgroundfunc .imagebg li, .addbackgroundfunc .mybg li, .addbackgroundfunc .recommendbg li {
    position: relative;
    float: left;
    width: 70px;
    height: 110px;
    margin: 5px;
    overflow: hidden
  }

  .addbackgroundfunc .imagebg li img, .addbackgroundfunc .mybg li img, .addbackgroundfunc .recommendbg li img {
    display: block;
    width: 100%;
    height: 100%
  }

  .addbackgroundfunc .mybg li a.deletemypic {
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
  .addbackgroundfunc .mybg li a.deletemypic i {
    position: absolute;
    left: 18px;
    bottom: 4px;
  }

  .addbackgroundfunc .mybg li:hover a.deletemypic {
    display: block
  }

  .addbackgroundfunc .mybg .nopic img {
    display: block;
    width: 86px;
    height: 74px;
    margin: 30px auto
  }

  .addbackgroundfunc .mybg .nopic p {
    font-size: 14px;
    color: #929497;
    text-align: center
  }

  .addbackgroundfunc .uploadpic {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0
  }

  .addbackgroundfunc .uploadpic a.uploadbtn {
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

  .addbackgroundfunc .pagesetting p {
    height: 30px;
    margin: 10px 20px 5px;
    line-height: 30px;
    font-size: 14px;
    color: #a2a2a2
  }

  .addbackgroundfunc .inputbox em {
    display: inline-block;
    width: 25px;
    height: 24px;
    line-height: 24px;
    font-style: normal;
    text-align: center
  }
  .uploadpic /deep/ .el-upload {
    display: block;
  }
</style>
