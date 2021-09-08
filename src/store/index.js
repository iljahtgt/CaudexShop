import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import $ from 'jquery'
//彙整所有Vuex行為

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state:{
        isLoading: false,
        products:[],
        categories:[],
        cart: {
            carts:[],
        },
    },
    actions:{
// 操作行為
        updateLoading(context, status){
            context.commit('LOADING', status);
        },
        getProducts(context) {
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
            context.commit('LOADING', true);
            axios.get(url).then((response) => {
              context.commit('PRODUCTS', response.data.products);
              context.commit('CATEGORIES', response.data.products);
              context.commit('LOADING', false);
            });
          },
          getCart(context) {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            context.commit('LOADING', true);
            axios.get(api).then((response) => {
              console.log("cart:", response.data.data.carts.length);
              context.commit('LOADING', false);
              context.commit('CART', response.data.data)
            });
          },
          removeCart(context, id) {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
            console.log(process.env.APIPATH, process.env.CUSTOMPATH);
            context.commit('LOADING', true);
            axios.delete(api).then((response) => {
              console.log(response.data);
              context.commit('LOADING', false);
              context.dispatch('getCart');
            });
          },
          addtoCart(context, {id, qty}) {
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            context.commit('LOADING', true);
            const item = {
              product_id: id,
              qty,
            };
            axios.post(url, { data: item }).then((response) => {
                context.commit('LOADING', false);
              context.dispatch('getCart');
              console.log("加入購物車:", response);
              $("#seeNoteModal").modal("hide");
            });
          },
    },
    mutations:{
// 操作資料狀態
//  常數都使用大寫
// 不使用非同步行為
        LOADING(state, status){
            state.isLoading = status;
        },
        PRODUCTS(state, payload){
        state.products = payload.filter((item) => {
          return item.is_enabled === 1
        })
            // state.products = payload;
        },
        CATEGORIES(state, payload){
            const categories = new Set();
            payload.forEach((item) => {
              categories.add(item.category);
            });
            state.categories = Array.from(categories);
        },
        CART(state, payload){
            state.cart = payload;
        },
    },
    getters: {
        categories(state){
            return state.categories;
        },
        products(state){
            return state.products;
        },
    }
});