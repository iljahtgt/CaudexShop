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
      <span>商品列表</span>
      <a class="d-flex align-items-center text-muted" href="#">
        <span data-feather="plus-circle"></span>
      </a>
    </h6>
    <ul class="nav flex-column mb-2">
      <li class="nav-item">
        <router-link class="nav-link" to="/customer/shop">
          <i class="fas fa-box-open"></i>
          總列表
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
      <li class="collapse" id="collapseExample" v-for="item in categories" :key="item" >
          <a href="#" @click.prevent="searchText = item"
          :class="{'active' : item === searchText}">
          {{ item }}
          </a>
      </li>
      <li>
          <div>
            <a href="#" class="list-group-item list-group-item-action"
            @click.prevent="searchText = ''"
            :class="{'active': searchText === ''}">
            全部顯示
            </a>
        </div>
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
  computed: {
      filterData(){
          const vm = this;
          if(vm.searchText) {
              return vm.products.filter((item) => {
                  const data = item.title.toLowerCase().includes(vm.searchText.toLowerCase());
                  return data;
              });
          }
          return this.products;
      }
  },
  methods: {
    getProducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      // console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      this.$http.get(api).then((response) => {
        // console.log(response.data.products);
        vm.products = response.data.products;
        vm.getUnique();
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
        // console.log(vm.categories);
    },
  },
  created() {
      this.getProducts();
  }
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