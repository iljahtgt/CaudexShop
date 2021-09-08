<template>
  <div>
    <div class="main-content mb-3">
 <div>
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
      <router-link class="navbar-brand col-sm-3 col-md-2 mr-0" to="/customer/shop">塊樂根源</router-link>
      <div class="userinfo dropdown px-3">
        <a class="btn btn-secondary dropdown-toggle" 
        role="button" 
        href="#"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
          >會員資訊</a
        >
        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <a class="dropdown-item text-primary" href="#" @click.prevent="signout"
            >Sign out</a
          >
          <router-link class="nav-link" to="/main/coupon">
          <i class="fas fa-box-open"></i>
          優惠券
        </router-link>
        </div>
      </div>

      <!-- 購物車內的數量 (Button 內包含 icon, 數量 badge) -->
      <div class="dropdown ml-auto">
        <button
          class="btn btn-sm btn-cart"
          data-toggle="dropdown"
          data-flip="false"
        >
          <i
            class="fa fa-shopping-cart text-light fa-2x"
            aria-hidden="true"
          ></i>
          <span class="badge badge-pill badge-danger">{{
            cart.carts.length
          }}</span>
          <span class="sr-only">購物去</span>
        </button>
        <div
          class="dropdown-menu dropdown-menu-right p-3"
          style="min-width: 300px"
          data-offset="400"
        >
          <h6 v-if="cart.carts.length">已選擇商品</h6>
          <h6 v-else>購物車空空的</h6>
          <table class="table table-sm">
            <tbody>
              <tr
                v-for="item in cart.carts"
                :key="item.id"
                v-if="cart.carts.length"
              >
                <td class="align-middle text-center">
                </td>
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">
                  {{ item.qty }}{{ item.product.unit }}
                </td>
                <td class="align-middle text-right">{{ item.total | currency }}</td>
                <a
                    href="#"
                    class="text-muted"
                    @click.prevent="removeCart(item.id)"
                  >
                    <i class="fa fa-trash-o mt-2" aria-hidden="true"></i>
                  </a>
              </tr>
            </tbody>
          </table>
          <router-link class="btn btn-primary btn-block"
                        to="/customer/order"
                         v-if="cart.carts.length"
          >
              <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
          </router-link>
                    <router-link class="btn btn-primary btn-block"
                        to="/customer/shop"
                         v-else
          >
              <i class="fa fa-cart-plus" aria-hidden="true"></i> 購物去
          </router-link>
        </div>
      </div>
      <!-- 購物車 -->
    </nav>
  </div>

  <div class="w-100 mx-auto">
    <img src="~@/assets/caudexproducts/ba.png" class="w-100" alt="">
  </div>
          <!-- shopnavbar -->
      <div class="row">
        <div class="col-md-3">
          <!-- 左側選單 (List group) -->
          <div class="list-group sticky-top">
            <a class="list-group-item list-group-item-action"
              href="#" @click.prevent="searchText = item"
              :class="{ 'active': item === searchText}"
              v-for="item in categories" :key="item">
              <i class="fa fa-tree" aria-hidden="true"></i>
              {{ item }}
            </a>
            <a href="#" class="list-group-item list-group-item-action"
              @click.prevent="searchText = ''"
              :class="{ 'active': searchText === ''}">
              全部顯示
            </a>
          </div>
        </div>

        <!-- 子頁面 -->
        <div class="col-md-9 pl-0 pr-5">
          <div class="d-flex mb-4 mt-3">
            <!-- Search bar -->
            <form class="form-inline my-3 my-lg-0">
              <div class="input-group">
                <input class="form-control" type="text" v-model="searchText"
                  placeholder="Search" aria-label="Search">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button"
                    @click="searchText = ''">
                    <i class="fa fa-times"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <!-- content -->
          <div class="tab-pane" id="list-gift">
            <div class="row align-items-stretch">
              <!-- 禮品 -->
              <div class="col-md-4 mb-4 shadow-sm" v-for="(item) in filterData" :key="item.id">
                <div class="card border-0 box-shadow text-center h-100">
                  <img class="card-img-top" width="75" height="200" :src="item.imageUrl" alt="Card image cap">
                  <div class="card-body">
                    <h4 class="card-title">{{ item.title }}</h4>
                    <p class="card-text text-left">{{ item.content }}</p>
                  </div>
                  <div class="card-footer border-top-0 mx-auto bg-white row">
                    <button
                        type="button"
                        class="btn btn-outline-secondary btn-block btn-sm"
                        @click="getNote(item.id)"
                      >
                      <i
                        class="fas fa-spinner fa-spin"
                        v-if="status.loadingItem === item.id"
                    ></i>
                        查看資訊
                      </button>
                    <button class="btn btn-outline-secondary btn-block btn-sm"
                      @click="addtoCart(item.id)">
                      <i class="fa fa-cart-plus" aria-hidden="true"></i> 加到購物車
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- NoteModal -->
<div
          class="modal fade"
          id="seeNoteModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
           v-for="(product) in filterData" :key="product.id"
        >
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content border-0">
              <div class="modal-header bg-dark text-white text-center mx-auto w-100">
                <h5 class="modal-title" id="exampleModalLabel">
                  {{ product.title }}
                </h5>
                <button
                  type="button"
                  class="close ml-5"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-sm-4">
                    <img class="img-fluid" alt="" :src="product.imageUrl" />
                  </div>
                  <div class="w-50 m-auto">
                    <p class="mb-0"> <h5>多肉描述：</h5>{{ product.content }}</p>
                    <hr>
                    <p>
                   <h5>多肉詳細內容：</h5> {{ product.description }}
                    </p>
                  <hr>
                  <div
                    class="d-flex justify-content-between align-items-baseline"
                  >
                    <div class="h5" v-if="!product.price">
                    定價：  {{ product.origin_price }}
                    </div>
                    <del class="h6" v-if="product.price">
                      定價：  {{
                      product.origin_price
                    }}</del>
                    <div class="h5 text-danger" v-if="product.price">
                    特價：  {{ product.price }}
                    </div>
                  </div>
                  </div>
                </div>
              </div>
              
              <div class="modal-footer">
                <div>數量</div>
                 <select
                    name=""
                    class="form-control w-25 m-0"
                    v-model="product.num"
                  >
                    <option :value="num" v-for="num in 10" :key="num">
                      選購 {{ num }} {{ product.unit }}
                    </option>
                  </select>
                <div class="text-muted text-nowrap mr-3">
                  小計 <strong>{{ product.num * product.price }}</strong>
                </div>
                <button
                  class="btn btn-primary"
                  @click="addtoCart(product.id, product.num)"
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
<!-- /NoteModal -->
  </div>
</template>

<script>
import ShopNavBar from "@/components/views/ShopNavBar.vue";
import AlertMessage from "../AlertMessage.vue";
import $ from "jquery";
import { mapGetters, mapActions} from 'vuex';

export default {
  name: "Home",
  components: {
    ShopNavBar,
    AlertMessage,
  },
  data() {
    return {
      searchText: "",
      status: {
        loadingItem: "",
      },
      cartlength: "",
    };
  },
  computed: {
    filterData() {
      const vm = this;
      if (vm.searchText) {
        return vm.products.filter((item) => {
          console.log(vm.searchText);
          console.log(item.category);
          const data = item.category
            .toLowerCase()
            .includes(vm.searchText.toLowerCase());
          console.log(data);
          return data;
        });
      }
      return this.products;
    },
    ...mapGetters(['categories', 'products', 'product']),
    cart() {
      return this.$store.state.cart; 
    }
  },
  methods: {
    ...mapActions(['getProducts', 'getNote']),
    signout() {
      const vm = this;
      const api = `${process.env.APIPATH}/logout`;
      this.$http.post(api).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          vm.$router.push("/login");
        }
      });
    },
    getCart() {
      this.$store.dispatch("getCart");
    },
    addtoCart(id, qty = 1) {
      this.$store.dispatch("addtoCart", {id, qty});  
    },
    removeCart(id) {
      this.$store.dispatch("removeCart", id);
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>

