import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import routes from "./routes";
import VueRouter from "vue-router";
window._ = require('lodash');
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});
axios.defaults.withCredentials = true;

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  DropdownPlugin
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  DropdownPlugin
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

import VueCookies from 'vue-cookies';
Vue.use(VueCookies)
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;
import { BProgress } from 'bootstrap-vue'
Vue.component('b-progress', BProgress)

import { BProgressBar } from 'bootstrap-vue'
Vue.component('b-progress-bar', BProgressBar)

const shared_data = {
  username: sessionStorage.username,
  number: sessionStorage.number,
  recipeStages:sessionStorage.recipeStages,
  AddToMeal(recipeId){
    sessionStorage.setItem(recipeId,0);
  },
  newStage(recipeId){
    sessionStorage.setItem(recipeId,sessionStorage.recipeId+1);
  },
  setNum(number) {
    sessionStorage.setItem("number", number);
    this.number = number;
  },
  lastSearch:sessionStorage.lastSearch,
  saveSearch(search){
    sessionStorage.setItem("lastSearch", search);
    this.lastSearch = search;
  },
  login(username) {
    sessionStorage.setItem("username", username);
    this.username = username;
  },
  logout() {
    sessionStorage.clear();
    this.username = undefined;
    this.lastSearch = undefined;
  },
};
// console.log(shared_data);

var VueDragula = require('vue-dragula');
Vue.use(VueDragula);
export class SpillComponent {
 constructor( dragulaService) {
    dragulaService.createGroup("SPILL", {
      removeOnSpill: true
    });
  }
}


new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");
