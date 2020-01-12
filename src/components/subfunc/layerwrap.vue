<template>
  <div class="layerwrap">
    <ul >
        <li v-for="(item, index) in list" :key="index" :class="{'active': item.id==id}" @click.stop="selectActive(item)">
          <a class="fl visiable iconfont" @click="setElementField(item.id, 'isVisible')" :class="{'icon-kejian active': item.isVisible, 'icon-bukejian1': !item.isVisible}"></a>
          <i ></i>
          <a class="fl lock iconfont" @click="setElementField(item.id, 'active')" :class="{'icon-jiesuo': item.active, 'icon-suo': !item.active}"></a>
          <span v-if="item.type=='text'" class="layer-text"><em class="layer-text-content">{{item.value}}</em></span>
          <span v-else-if="item.type=='materials'" class="layer-materials">{{item.name}}</span>
          <span v-else-if="item.type=='img'" class="layer-pic"><em class="fl">{{item.name}}</em> <img :src="item.value" class="fl layerpic"></span>
          <span v-else-if="item.type=='video'" class="layer-materials">{{item.name}}</span>
          <span v-else-if="item.type=='tele'" class="layer-tele">{{item.name}}</span>
          <span v-else-if="item.type=='link'" class="layer-link">{{item.name}}</span>
          <a class="fr layerdelete iconfont icon-shanchu" @click="deleteElement(item.id)"></a>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "layerwrap",
  props: {
    id: {
      type: String,
      default: ''
    },
    initList: {
      type: Array,
      default: []
    },
    excludeClassName: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      list: this.initList,
    }
  },
  methods: {
    setElementField(id, field) {
      this.$emit('setElementField', id, field)
    },
    deleteElement(id) {
      this.$emit('deleteElement', id)
    },
    selectActive(item) {
      this.$emit('selectActive', item)
    }
  }
}
</script>

<style scoped>

  .layerwrap {
    position: absolute;
    width: 340px;
    top: 44px;
    bottom: 0;
    overflow-y: auto;
    overflow-x: hidden
  }

  .layerwrap ul {
    margin-bottom: 20px
  }

  .layerwrap li {
    height: 60px;
    overflow: hidden;
    padding: 0 15px
  }

  .layerwrap li a {
    width: 26px;
    height: 26px;
    line-height: 26px;
    margin: 17px 10px;
    text-align: center;
    color: #aeaeae;
    border-radius: 50%
  }

  .layerwrap li a.visiable {
    font-size: 16px
  }

  .layerwrap li a.lock {
    font-size: 14px
  }

  .layerwrap li a.layerdelete {
    font-size: 12px
  }

  .layerwrap li i {
    float: left;
    width: 1px;
    height: 26px;
    background: #aeaeae;
    margin: 17px 0
  }

  .layerwrap li span {
    float: left;
    height: 60px;
    line-height: 60px;
    color: #fff;
    cursor: pointer;
    width: 50%
  }
  .layerwrap li span.layer-text {
    width: 160px;
  }
  .layerwrap li span.layer-text .layer-text-content {
    float: left;
    width: 160px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .layerwrap li span .layerpic {
    position: relative;
    max-width: 30px;
    top: 50%;
    margin-left: 30px;
    transform: translateY(-50%)
  }

  .layerwrap li.active, .layerwrap li:hover {
    background: #2c2d2e
  }

  .layerwrap li.active a, .layerwrap li:hover a {
    background: #232425
  }

  .layerwrap li a.active {
    color: #1bceb3
  }
</style>
