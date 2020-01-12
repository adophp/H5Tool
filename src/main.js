// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import utils from './utils/index'
import config from './config/index'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.prototype.utils = utils;
Vue.prototype.config = config;
Vue.use(ElementUI, {size: 'small', zIndex: 3000});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
