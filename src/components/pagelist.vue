<template>
  <div class="pagelistwrap" :class="{'closed': pageState}">
    <a class="closebar" @click="pageState=!pageState"></a>
    <div class="pagelist">
      <div class="objecttype">
        <a class="page active">页面</a>
      </div>
      <div class="pagewrap">
        <ul>
          <li v-for="(page, index) in pageContainer" :key="index" :class="{'active': npage==index}">
            <div class="picindex">
              <a class="picup iconfont icon-jiantoushangsheng" @click="up(index)"></a>
              <p>{{index+1}}</p>
              <a class="picdown iconfont icon-jiantouxiajiang" @click="down(index)"></a>
            </div>
            <div class="picwrap" @click="setPage(index)">
              <div style="transform-origin: 0px 0px; transform: scale(0.22);">
                <div style="width: 640px; height: 1018px;" :style="{background: page.backgroundImage!=''?'url('+page.backgroundImage+') left top / 100% 100% no-repeat':(page.backgroundColor==''?'rgba(255,255,255)':page.backgroundColor)}"></div>
                <div v-for="(element, key) in page.layer" :key="key" :type="element.type" class="item_wrapper" style="position: absolute; background-repeat: no-repeat; box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 0px; overflow-wrap: break-word;" :style="{borderRadius: element.borderRadius+'px', borderColor: element.borderColor, borderStyle: element.borderStyle, color: element.color, opacity: (100 - element.opacity)/100, textAlign: element.textAlign, transform: 'rotateZ('+element.rotate+'deg)', zIndex: element.zIndex, lineHeight: element.height+'px', backgroundColor: element.backgroundColor!=''?element.backgroundColor:'translate', left: element.x+'px', top: element.y+'px'}">
                  <div :class="element.type+'-element'">
                    <div class="wrapper" v-if="element.type=='img'" style="background-position: 0px 0px; overflow-wrap: break-word;" :style="{borderRadius: element.borderRadius+'px', borderColor: element.borderColor, borderStyle: element.borderStyle, color: element.color, width: element.width+'px', height: element.height+'px', backgroundImage: 'url('+element.value+')', backgroundSize: element.width+'px '+element.height+'px'}">
                      <div class="render" :class="element.type+'-render'">
                      </div>
                    </div>
                    <div class="wrapper" v-else-if="element.type=='text'" style="overflow-wrap: break-word;" :style="{borderRadius: element.borderRadius+'px', borderColor: element.borderColor, borderStyle: element.borderStyle, color: element.color, width: element.width+'px', height: element.height+'px', lineHeight: element.height+'px'}">
                      <div class="render" :class="element.type+'-render'">
                        <div class="scaleArea" style="">
                          <div class="vue-edit-area" :style="{width: element.width+'px', borderRadius: element.borderRadius+'px', borderColor: element.borderColor, borderStyle: element.borderStyle, color: element.color, fontSize: element.fontSize+'px', lineHeight: element.lineHeight, letterSpacing: element.letterSpacing+'px', textDecoration: element.textDecoration?'underline':'', fontFamily: element.fontFamily?element.fontFamily:'', fontWeight: element.fontBold?'bold':'', fontStyle:element.fontStyle?'italic':''}">{{element.value}}</div>
                        </div>
                      </div>
                    </div>
                    <div class="wrapper" v-else-if="element.type=='video'" style="box-shadow: black 0px 0px 0px; overflow-wrap: break-word;" :style="{width: element.width+'px', height: element.height+'px', lineHeight: element.height+'px', fontFamily: element.fontFamily, borderRadius: element.borderRadius+'px', fontStyle: element.fontStyle, fontWeight: element.fontBold?'bold':'normal', textAlign: element.textAlign, color: element.color, fontSize: element.fontSize+'px', textDecoration: element.textDecoration?'underline':'none'}">
                      <div class="render" :class="`${element.type+'-render'}`" :style="{width: element.width+'px', height: element.height+'px'}" @click.stop="playVideo(element.id)">
                        <video :ref="'video-'+element.id" :src="element.value" :width="element.width" :height="element.height"></video>
                        <div :id="'render-'+element.id" class="play-icon-bg">
                          <span class="play-icon-wrapper"><i class="iconfont icon-bofang"></i></span>
                        </div>
                      </div>
                    </div>
                    <div class="wrapper" v-else-if="element.type=='tele'" style="box-shadow: black 0px 0px 0px; overflow-wrap: break-word;" :style="{width: element.width+'px', height: element.height+'px', lineHeight: element.height+'px', fontFamily: element.fontFamily, borderRadius: element.borderRadius+'px', fontStyle: element.fontStyle, fontWeight: element.fontBold?'bold':'normal', textAlign: element.textAlign, color: element.color, fontSize: element.fontSize+'px', textDecoration: element.textDecoration?'underline':'none'}">
                      <div class="link-button-render render" :style="{width: element.width+'px', height: element.height+'px'}">
                        <div class="text1 link-button-render-text">
                          <a class="telebtn" style="overflow-wrap: break-word;" :style="{fontFamily: element.fontFamily, fontSize: element.fontSize+'px', borderRadius: element.borderRadius+'px', textAlign: element.textAlign, overflowWrap: element.overflowWrap, width: element.width+'px', height: element.height+'px', lineHeight: element.height+'px', color: element.color, backgroundColor: element.backgroundColor}"><i class="iconfont icon-bohao" style="font-size: 36px;"></i>{{element.text}}</a>
                        </div>
                      </div>
                    </div>
                    <div class="wrapper" v-else-if="element.type=='link'" style="box-shadow: black 0px 0px 0px; overflow-wrap: break-word;" :style="{width: element.width+'px', height: element.height+'px', lineHeight: element.height+'px', fontFamily: element.fontFamily, borderRadius: element.borderRadius+'px', fontStyle: element.fontStyle, fontWeight: element.fontBold?'bold':'normal', textAlign: element.textAlign, color: element.color, fontSize: element.fontSize+'px', textDecoration: element.textDecoration?'underline':'none'}">
                      <div class="link-button-render render" :style="{width: element.width+'px', height: element.height+'px'}">
                        <div class="text1 link-button-render-text">
                          <a class="linkbtn" :style="{fontFamily: element.fontFamily, fontSize: element.fontSize+'px', borderRadius: element.borderRadius+'px', textAlign: element.textAlign, overflowWrap: element.overflowWrap,width: element.width+'px', height: element.height+'px', lineHeight: element.height+'px', color: element.color, backgroundColor: element.backgroundColor}">{{element.text}}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="editbtn">
                  <el-tooltip class="item" effect="dark" content="复制页面" placement="top" @click.native="copyPage(index)">
                    <a class="addpage iconfont icon-fuzhi"></a>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="删除页面" placement="top" @click.native="deletePage(index)">
                    <a class="preview iconfont icon-sanchu"></a>
                  </el-tooltip>
              </div>
            </div>
          </li>

        </ul>
      </div>
      <div>
        <a class="addpagebtn iconfont icon-tianjia1" @click="addPage"></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pagelist",
  props: {
    npage: {
      type: Number,
      default: 0
    },
    pageList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      pageState: this.utils.isMobile()?true:false
    }
  },
  methods: {
    addPage(){
      this.$emit('addPage')
    },
    up(index) {
      if (index == 0) return;
      var tmpPage = this.pageList;
      var o = tmpPage[index-1];
      tmpPage[index-1] = tmpPage[index];
      tmpPage[index] = o;
      this.$emit('updatePage', JSON.stringify(tmpPage));
    },
    down(index) {
      if ((index+1) == this.pageList.length) return;
      var tmpPage = this.pageList;
      var o = tmpPage[index+1];
      tmpPage[index+1] = tmpPage[index];
      tmpPage[index] = o;
      this.$emit('updatePage', JSON.stringify(tmpPage));
    },
    setPage(n) {
      this.$emit('setPage', n)
    },
    copyPage(index) {
      this.$emit('copyPage', index)
    },
    deletePage(index) {
      if (this.pageList.length == 1) {
        this.$message({
          type: 'warning',
          message: '至少保留一页'
        });
        return;
      }
      var _that = this;
      this.$confirm('删除后不可恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _that.$emit('deletePage', index)
      }).catch(() => {
        //
      });
    }
  },
  computed: {
    pageContainer() {
      return this.pageList
    }
  }
}
</script>

<style scoped>
  .pagelistwrap {
    position: fixed;
    top: 50px;
    bottom: 0;
    right: 0;
    width: 215px;
    background: #404040;
    z-index: 11
  }
  .pagelistwrap.closed {
    right: -215px
  }
  .pagelistwrap .closebar {
    position: absolute;
    display: none;
    width: 16px;
    height: 93px;
    top: 50%;
    left: -16px;
    margin-top: -46px;
    transform: rotateY(180deg);
    background: url(../assets/images/pageleft.png) no-repeat 50%;
  }

  .pagelistwrap.closed .closebar {
    background: url(../assets/images/pageright.png) no-repeat 50%
  }

  .pagelist .objecttype {
    width: 100%;
    overflow: hidden
  }

  .pagelist .objecttype a {
    float: left;
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 16px;
    color: #aeaeae;
    background: #333
  }

  .pagelist .pagewrap {
    position: absolute;
    width: 210px;
    top: 44px;
    bottom: 0;
    overflow-y: auto;
    overflow-x: hidden
  }

  .pagelist .pagewrap {
    bottom: 48px
  }

  .pagelist .pagewrap > ul > li {
    height: 226px;
    margin: 20px 0;
    overflow: hidden
  }

  .pagelist .pagewrap li .picindex {
    margin-top: 77px;
    margin-left: 10px;
    float: left
  }

  .pagelist .pagewrap li .picindex a {
    display: block;
    font-size: 16px;
    color: #888e9b
  }

  .pagelist .pagewrap li .picindex a:hover {
    color: #1bceb3
  }

  .pagelist .pagewrap li .picindex p {
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff
  }

  .pagelist .pagewrap li .picwrap {
    position: relative;
    float: left;
    width: 141px;
    height: 224px;
    margin-left: 10px;
    border: 1px solid #313233;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer
  }

  .pagelist .pagewrap li.active .picwrap, .pagelist .pagewrap li:hover .picwrap {
    border: 1px solid #1bceb3
  }

  .pagelist .pagewrap li .picwrap .editbtn {
    display: none;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 24px;
    background: rgba(0, 0, 0, .6)
  }

  .pagelist .pagewrap li:hover .picwrap .editbtn {
    display: block;
  }

  .pagelist .pagewrap li .picwrap .editbtn a {
    float: left;
    width: 67px;
    height: 24px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    font-size: 14px
  }

  .pagelist .pagewrap li .picwrap .editbtn a:hover {
    color: #1bceb3
  }

  .addpagebtn {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 48px;
    line-height: 48px;
    background: #535353;
    text-align: center;
    font-size: 20px;
    color: #333
  }

  .addpagebtn:hover {
    color: #1bceb3
  }
@media (max-width: 767.98px) {
  .pagelistwrap .closebar{
    display: block;
  }
}
</style>
