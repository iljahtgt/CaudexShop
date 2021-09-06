<template>
  <div>
    <h6
      class="
        sidebar-heading
        d-flex
        justify-content-between
        align-items-center
        px-3
        mt-4
        mb-1
        text-muted
      "
    >
      <span>管理員</span>
      <a class="d-flex align-items-center text-muted" href="#">
        <span data-feather="plus-circle"></span>
      </a>
    </h6>
    <ul class="nav flex-column mb-2">
      <li class="nav-item">
        <router-link class="nav-link" to="/main/notes">
          <i class="fas fa-box-open"></i>
          總列表
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/main/coupon">
          <i class="fas fa-box-open"></i>
          優惠券
        </router-link>
      </li>
      <li>
        <div>
          <a
            href="#collapseExample"
            role="button"
            data-toggle="collapse"
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
          <i class="fa"></i>
            塊根商品
          </a>
        </div>
      </li>
      <li v-for="item in products" :key="item.id">
        <div class="collapse" id="collapseExample">
          <a href="#">{{ item.category }}</a>
        </div>
      </li>
    </ul>
    <h6
      class="
        sidebar-heading
        d-flex
        justify-content-between
        align-items-center
        px-3
        mt-4
        mb-1
        text-muted
      "
    >
      <span>模擬功能</span>
      <a class="d-flex align-items-center text-muted" href="#">
        <span data-feather="plus-circle"></span>
      </a>
    </h6>
    <ul class="nav flex-column mb-2">
      <li class="nav-item">
        <router-link class="nav-link" to="/index">
          <i class="fa fa-cart-arrow-down"></i>
          電商平台頁面
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: [],
      searchText: '',
      categories: [],
      isLoading: false,
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products`;
      const vm = this;
      // console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      this.$http.get(api).then((response) => {
        console.log(response.data.products);
        vm.products = response.data.products;
        vm.category = response.data.products.categories;
      });
    },
  },
  created() {
      this.getProducts();
  },
  computed: {
    filterData(){
      const vm = this;
    if(vm.searchText){
      return vm.products.filter((item) => {
        const data = item.title.toLowerCase().includes(vm.searchText.toLowerCase());
        return data;
      });
      return this.products;
    }
    }
  },
};
</script>

<style scoped>
[data-toggle="collapse"] .fa:before {   
  content: "\f107";
}

[data-toggle="collapse"].collapsed .fa:before {
  content: "\f105";
}
</style>