<template>
  <div class="animwrap">
    <div class="setanim">
      <div class="animbtn">
        <a class="fl" @click="show=true"><i class="iconfont icon-tianjia fl"></i>添加动画</a>
        <a class="fr" @click="previewAnimation"><i class="iconfont icon-yulan fl"></i>预览动画</a>
      </div>
      <div class="animitemwrap" v-if="show">
        <el-collapse accordion v-model="collapseName">
          <el-collapse-item name="1">
            <template slot="title">
              <i class="iconfont icon-Arrowright"></i> 动画1({{ele.ani?aniName:'无动画'}})<a class="deleteanim iconfont icon-shanchu1"></a>
              <a class="deleteanim iconfont icon-shanchu" @click.stop="clearAnimation"></a>
            </template>
            <div class="el-collapse-content-box" v-if="show">
              <div class="leftcont">
                <div class="effectList">
                  <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane v-for="(item, index) in effectList" :key="index" :label="item.label" :name="item.name">
                      <a href="javascript:;" slot="label">{{item.label}}</a>
                      <div class="tabcont">
                        <el-row :gutter="12">
                          <el-col :span="8" v-for="(ef, key) in item.list" :key="key">
                            <el-card shadow="hover" :class="{'active': ele.ani===ef.value}" @click.native="handleAni(ef)">{{ef.label}}</el-card>
                          </el-col>
                        </el-row>
                      </div>
                    </el-tab-pane>
                  </el-tabs>
                </div>
                <ul class="animitem">
                  <li>
                    <label>时间</label>
                    <div class="slideboxbar fl">
                      <el-slider v-model="ele.duration" :min="0" :max="10" :step="0.1"></el-slider>
                    </div>
                    <div class="inputbox fl">
                      <el-input type="number" class="inputitem el-input-number" :value="ele.duration" @input="(value) => formatStrtoFloat(value, 'duration')" :min="0" :max="10" :step="0.1" placeholder="" autocomplete="off"></el-input>
                      <em>秒</em>
                    </div>
                  </li>
                  <li>
                    <label>延迟</label>
                    <div class="slideboxbar fl">
                      <el-slider v-model="ele.delay" :min="0" :max="20" :step="0.1"></el-slider>
                    </div>
                    <div class="inputbox fl">
                      <el-input type="number" class="inputitem el-input-number" :value="ele.delay" @input="(value) => formatStrtoFloat(value, 'delay')" :min="0" :max="20" :step="0.1" placeholder="" autocomplete="off"></el-input>
                      <em>秒</em>
                    </div>
                  </li>
                  <li>
                    <label>循环次数</label>
                    <el-select v-model="ele.iteration" placeholder="请选择" class="item-select">
                      <el-option
                        v-for="(item,index) in iterationOption"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                        :class="excludeClassName">
                        <span class="el-select-selected-value">{{item.label}}</span>
                      </el-option>
                    </el-select>
                  </li>
                </ul>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "animwrap",
  props: {
    id: {
      type: String,
      default: ''
    },
    initEle: {
      type: Object,
      default: {
        ani: '',
        duration: 1,
        delay: 0,
        iteration: ''
      }
    },
    excludeClassName: {
      type: String,
      default: ''
    },
  },
  data(){
    return {
      ele: this.initEle,
      iterationOption: [
        {
          value: '1',
          label: '无'
        },
        {
          value: '2',
          label: '2次'
        },
        {
          value: '3',
          label: '3次'
        },
        {
          value: '4',
          label: '4次'
        },
        {
          value: '5',
          label: '5次'
        },
        {
          value: '6',
          label: '6次'
        },
        {
          value: '7',
          label: '7次'
        },
        {
          value: '8',
          label: '8次'
        },
        {
          value: 'infinite',
          label: '无限循环'
        },
      ],
      effectList: [
        {
          label: '进入类',
          name: 'rotate',
          list: [
            {
              value: 'rotateIn',
              label: '旋转进入'
            },
            {
              value: 'rotateInDownLeft',
              label: '左上旋入'
            },
            {
              value: 'rotateInDownRight',
              label: '右上旋入'
            },
            {
              value: 'rotateInUpLeft',
              label: '左下旋入'
            },
            {
              value: 'rotateInUpRight',
              label: '右下旋入'
            },
            {
              value: 'slideInDown',
              label: '自上滑入'
            },
            {
              value: 'slideInUp',
              label: '自下滑入'
            },
            {
              value: 'slideInLeft',
              label: '自左滑入'
            },
            {
              value: 'slideInRight',
              label: '自右滑入'
            },
            {
              value: 'zoomIn',
              label: '中心放大'
            },
            {
              value: 'zoomInDown',
              label: '顶部放大'
            },
            {
              value: 'zoomInUp',
              label: '底部放大'
            },
            {
              value: 'zoomInLeft',
              label: '自左放大'
            },
            {
              value: 'zoomInRight',
              label: '自右放大'
            },
            {
              value: 'rollIn',
              label: '翻滚进入'
            },
            {
              value: 'bounceIn',
              label: '弹跳进入'
            },
            {
              value: 'bounceInDown',
              label: '从上跳入'
            },
            {
              value: 'bounceInLeft',
              label: '从左跳入'
            },
            {
              value: 'bounceInRight',
              label: '从右跳入'
            },
            {
              value: 'bounceInUp',
              label: '从下跳入'
            },
            {
              value: 'fadeIn',
              label: '淡入'
            },
            {
              value: 'fadeInDown',
              label: '从顶淡入'
            },
            {
              value: 'fadeInDownBig',
              label: '从顶快入'
            },
            {
              value: 'fadeInLeft',
              label: '从左淡入'
            },
            {
              value: 'fadeInLeftBig',
              label: '从左快入'
            },
            {
              value: 'fadeInRight',
              label: '从右淡入'
            },
            {
              value: 'fadeInRightBig',
              label: '从右快入'
            },
            {
              value: 'fadeInUp',
              label: '从底淡入'
            },
            {
              value: 'fadeInUpBig',
              label: '从底快入'
            },
            {
              value: 'flip',
              label: '翻转'
            },
            {
              value: 'flipInX',
              label: '上下翻转'
            },
            {
              value: 'flipInY',
              label: '左右翻转'
            },
            {
              value: 'lightSpeedIn',
              label: '右侧弹入'
            },
          ],
        },
        {
          label: '强调类',
          name: 'attention',
          list: [
            {
              value: 'bounce',
              label: '弹跳'
            },
            {
              value: 'flash',
              label: '闪现'
            },
            {
              value: 'pulse',
              label: '跳动'
            },
            {
              value: 'rubberBand',
              label: '橡皮筋'
            },
            {
              value: 'shake',
              label: '轻微晃动'
            },
            {
              value: 'swing',
              label: '上下摇摆'
            },
            {
              value: 'tada',
              label: '时间晃动'
            },
            {
              value: 'wobble',
              label: '扇形摇摆'
            },
            {
              value: 'jello',
              label: '果冻'
            },
          ]
        },
        {
          label: '退出类',
          name: 'zoom',
          list: [
            {
              value: "zoomOut",
              label: "中心缩小"
            },
            {
              value: "zoomOutDown",
              label: "向下缩小"
            },
            {
              value: "zoomOutLeft",
              label: "向左缩小"
            },
            {
              value: "zoomOutRight",
              label: "向右缩小"
            },
            {
              value: "zoomOutUp",
              label: "向上缩小"
            },
            {
              value: "slideOutUp",
              label: "向上滑出"
            },
            {
              value: "slideOutDown",
              label: "向下滑出"
            },
            {
              value: "slideOutLeft",
              label: "向左滑出"
            },
            {
              value: "slideOutRight",
              label: "向右滑出"
            },
            {
              value: "rotateOut",
              label: "旋转退出"
            },
            {
              value: "rotateOutDownLeft",
              label: "左下旋出"
            },
            {
              value: "rotateOutDownRight",
              label: "右下旋出"
            },
            {
              value: "rotateOutUpLeft",
              label: "左上旋出"
            },
            {
              value: "rotateOutUpRight",
              label: "右上旋出"
            },
            {
              value: "bounceOut",
              label: "弹跳退出"
            },
            {
              value: "bounceOutLeft",
              label: "向左弹出"
            },
            {
              value: "bounceOutRight",
              label: "向右弹出"
            },
            {
              value: "bounceOutUp",
              label: "向上弹出"
            },
            {
              value: "bounceOutDown",
              label: "向下弹出"
            },
            {
              value: "fadeOut",
              label: "淡出"
            },
            {
              value: "fadeOutDown",
              label: "向下淡出"
            },
            {
              value: "fadeOutDownBig",
              label: "向下快出"
            },
            {
              value: "fadeOutLeft",
              label: "向左淡出"
            },
            {
              value: "fadeOutLeftBig",
              label: "向左快出"
            },
            {
              value: "fadeOutRight",
              label: "向右淡出"
            },
            {
              value: "fadeOutRightBig",
              label: "向右快出"
            },
            {
              value: "fadeOutUp",
              label: "向上淡出"
            },
            {
              value: "fadeOutUpBig",
              label: "向上快出"
            },
            {
              value: "flipOutX",
              label: "上下翻出"
            },
            {
              value: "flipOutY",
              label: "左右翻出"
            },
            {
              value: "lightSpeedOut",
              label: "倾斜淡出"
            },
            {
              value: "rollOut",
              label: "翻滚退出"
            },
            {
              value: "hinge",
              label: "铰链退出"
            }
          ]
        }
      ],
      activeName: 'rotate',
      aniName: '无动画',
      show: this.initEle.ani!=''?true:false,
      collapseName: []
    }
  },
  created() {
    var that = this;
    if (this.ele.ani != '') {
      that.collapseName = ['1']
      this.effectList.forEach(function (item, index) {
        item.list.forEach(function (list, key) {
          if (list.value == that.ele.ani) {
            that.activeName = item.name;
            that.aniName = list.label;
          }
        })
      })
    }
  },
  methods: {
    clearAnimation() {
      this.show = false
      this.ele.ani = ''
      this.aniName = '无动画'
    },
    handleClick() {

    },
    handleAni(obj){
      this.ele.ani = obj.value
      this.aniName = obj.label
    },
    previewAnimation() {
      this.$emit('previewAnimation', this.id)
    }
  },
  watch: {
    ele: {
      handler(newData, oldData){
        this.$emit('setElementNode', this.id, newData)
      },
      deep: true,
    },
  }
}
</script>

<style scoped>
  .item-select {
    width: 276px;
    height: 39px;
    line-height: 39px;
    font-size: 14px;
    background: rgb(53, 53, 53);
    color: rgb(174, 174, 174);
  }
  .animwrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 0;
    margin-bottom: 20px
  }

  .animwrap .animbtn {
    margin: 10px 0;
    overflow: hidden;
    padding: 0 32px
  }

  .animwrap .animbtn a {
    width: 80px;
    color: #ccc;
    display: inline-block;
    font-size: 14px;
    height: 32px;
    line-height: 32px;
    margin: 11px -1.5% 0 0;
    background: #1bceb3;
    text-align: center;
    border-radius: 2px;
    padding: 0 22px;
    cursor: pointer;
  }

  .animwrap .animbtn a:hover {
    color: #fff
  }

  .animwrap .animbtn a i {
    font-size: 14px
  }

  .animwrap .setanim {
    position: relative;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto
  }
  .el-collapse-item /deep/ .el-collapse-item__header {
    position: relative;
    color: rgb(139, 139, 139);
    background: rgb(54, 55, 56);
    border: 0 none;
  }
  .animwrap .setanim .deleteanim {
    position: absolute;
    top: 0;
    right: 15px;
    font-size: 12px;
    color: #8b8b8b
  }

  .animwrap .setanim .deleteanim:hover {
    color: #fff
  }
  .effectList {
    background: rgb(54, 55, 56);
  }
  .effectList /deep/ .el-tabs__header {
    padding: 1px;
  }
  .effectList /deep/ .el-tabs__nav {
    width: 100%;
    display: flex;
    align-content: space-between;
  }
  .effectList /deep/ .el-tabs__nav .el-tabs__active-bar {
    display: none;
  }
  .effectList /deep/ .el-tabs__item {
    overflow: hidden;
  }
  .effectList /deep/ .el-tabs__item {
    flex: 33.33%;
    padding: 1px;
  }
  .effectList /deep/ .el-tabs__item a {
    display: block;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #aeaeae;
    font-size: 14px;
    background: #404040;
  }
  .effectList /deep/ .el-tabs__item.is-active a, .effectList /deep/ .el-tabs__item a:hover {
    color: #fff;
    background: #6b6b6b;
  }
  .effectList /deep/ .el-tabs__nav-wrap::after {
    display: none;
  }
  .effectList .tabcont {
    padding: 1px;
  }
  .effectList .tabcont .el-row {
    margin-left: 0!important;
    margin-right: 0!important;
  }
  .effectList .tabcont .el-row .el-col {
    margin-bottom: 6px;
    text-align: center;
    font-size: 16px;
  }
  .effectList .tabcont .el-row .el-col /deep/ .el-card__body {
    padding: 10px 0;
    cursor: pointer;
    color: #fff;
  }
  .effectList .tabcont .el-row .el-col /deep/ .el-card {
    border: 1px solid transparent;
    background-color: #6b6b6b;
  }

  .effectList .tabcont .el-row .el-col /deep/ .el-card.active, .effectList .tabcont .el-row .el-col /deep/ .el-card:hover {
    border: 1px solid #1bceb3;
  }
  .animwrap .setanim .animitemwrap {
    position: absolute;
    top: 74px;
    bottom: 0;
    left: 0;
    right: -6px;
    padding: 0 32px
  }
  .animwrap .setanim .animitemwrap .el-collapse {
    border: 0 none;
  }
  .animwrap .setanim .animitemwrap /deep/ .el-collapse-item__wrap {
    background-color: transparent;
    border: 0 none;
    overflow: auto;
  }
  .animwrap .setanim .animitem>li {
    margin: 10px 0 20px;
    clear: both;
    overflow: hidden;
  }
  .slideboxbar {
    margin-left: 13px;
  }
  .animwrap .setanim .animitem label {
    display: block;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #a2a2a2;
  }
  .slideboxbar .el-slider {
    width: 160px; margin-right: 16px;
  }
  .inputbox {
    position: relative;
    float: left;
    height: 30px;
    line-height: 30px;
    color: #fff;
    background: #3a3a3a;
    border-radius: 4px;
    overflow: hidden
  }

  .inputitem {
    float: left;
    width: 40px;
    height: 30px;
    padding: 0 0 0 15px;
    border: 0;
    font-size: 14px
  }
  .inputitem /deep/ input.el-input__inner {
    padding: 0;
    border-radius: 0;
    border: 0 none;
    display: block;
    width: 100%;
    height: inherit;
    line-height: inherit;
    text-align: left;
    outline: 0;
    -moz-appearance: textfield;
    color: inherit;
    background: inherit;
    transition: all .2s linear;
    text-indent: inherit;
  }
  /deep/ .el-input--small .el-input__inner{
    background-color: transparent;
    border: 0 none;
    color: rgb(174, 174, 174);
  }
  .inputbox em {
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-style: normal;
    text-align: left;
    font-size: 14px
  }
  .el-collapse-item /deep/ .el-collapse-item__header>i.icon-Arrowright {
    transition: transform .2s ease-in-out;
  }
  .el-collapse-item /deep/ .el-collapse-item__header.is-active>i.icon-Arrowright {
    transform: rotate(90deg);
  }
  .el-collapse-item /deep/ .el-collapse-item__header .el-collapse-item__arrow {
    display: none;
  }
</style>
