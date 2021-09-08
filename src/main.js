// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { extend, ValidationProvider, ValidationObserver, localize, configure} from 'vee-validate';
import {required, email} from 'vee-validate/dist/rules';
import zhTW from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';
import Vuex from 'vuex';


import App from './App';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';
import store from './store';

extend('email', email);
extend('required',{
  ...required,
  message: '欄位需填寫',
});
extend('tel',{
  message: '{_field_}格式不正確',
  validate: value =>{
    const reg = /^09[0-9]{8}$/;
    return reg.test(value);
  }
});

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize("zh_TW", zhTW);

Vue.config.productionTip = false
Vue.use(VueAxios, axios);
Vue.use(Vuex);
Vue.component('Loading', Loading);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Vue.filter('currency', currencyFilter);

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  }
})

axios.defaults.withCredentials = true;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    console.log('目標網頁需驗證');
    const url = `${process.env.APIPATH}/api/user/check`;
          axios.post(url).then((response) => {
              console.log(response);
              if(response.data.success){
                next();
              }else{
                next({
                  path: '/login',
                });
              };
          });
  }else{
    next();
  }
});
