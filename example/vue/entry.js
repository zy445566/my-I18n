import Vue from 'vue'
import localeInit from "./localeInit.js";// 引用初始化国际化必须在引用需国际化组件上方
import app from './app.vue';
import myI18n from "my-i18n";
const myI18nInstance = myI18n.getInstance();

Vue.prototype.myI18n = myI18nInstance;
new Vue({
    el: '#root',
    render: h => h(app)
});