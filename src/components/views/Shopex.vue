<template>
  <div>
    <div class="main-content mb-3">
      <ShopNavBar/>
      <Loading :active.sync="isLoading"></Loading>
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
            <button class="btn btn-outline-primary ml-auto" type="button"
              @click="getProducts">
              重新取得資料
            </button>
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
                  <div class="card-footer border-top-0 bg-white row">
                    <button
                        type="button"
                        class="btn btn-outline-secondary btn-block btn-sm"
                        @click="getNote(item.id)"
                      >
                      <i
                        class="fas fa-spinner fa-spin"
                        v-if="status.loadingItem === item.id"
                    ></i>
                        View
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
                  <select
                    name=""
                    class="form-control mt-3"
                    v-model="product.num"
                  >
                    <option :value="num" v-for="num in 10" :key="num">
                      選購 {{ num }} {{ product.unit }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="modal-footer">
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
import $ from 'jquery';

export default {
  name: 'Home',
  components: {
    ShopNavBar,
    AlertMessage,
  },
  data() {
    return {
      products: [],
      searchText: '',
      categories: [],
      isLoading: false,
      status: {
        loadingItem: "",
      },
    };
  },
  computed: {
    filterData() {
      const vm = this;
      if (vm.searchText) {
        return vm.products.filter((item) => {
          const data = item.title.toLowerCase().includes(vm.searchText.toLowerCase());
          return data;
        });
      }
      return this.products;
    },
  },
  methods: {
    getProducts() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        const temp = response.data.products;
        vm.products = temp.filter((item) => {
          return item.is_enabled === 1
        })
        console.log('取得產品列表:', response);
        vm.getUnique();
        vm.isLoading = false;
      });
    },
    addtoCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      const item = {
        product_id: id,
        qty,
      };
      vm.isLoading = true;
      this.$http.post(url, { data: item }).then((response) => {
        vm.isLoading = false;
        console.log('加入購物車:', response);
        $("#seeNoteModal").modal("hide");
      });
    },
    getNote(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      const vm = this;
      vm.isLoading = true;
      //   console.log(id);
      this.$http.get(api).then((response) => {
        // console.log(response.data.product);
        vm.product = response.data.product;
        $("#seeNoteModal").modal("show");
        vm.isLoading = false;
      });
    },
    getUnique() {
      const vm = this;
      const categories = new Set();
      vm.products.forEach((item) => {
        categories.add(item.category);
      });
      vm.categories = Array.from(categories);
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
