<template>
  <div>
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Caudex Shop</a>
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
<!-- props cart.length -->
          <!-- <span class="badge badge-pill badge-danger">{{
            cartlength
          }}</span> -->
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
</template>

<script>

export default {
  name: "Navbar",
  props:['cartlength'],
  data() {
    return {
      cart: [],
    };
  },
  methods: {
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
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log("cart:", response.data.data.carts.length);
        vm.isLoading = false;
        vm.cart = response.data.data;
      });
    },
    removeCart(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      const vm = this;
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      vm.isLoading = true;
      this.$http.delete(api).then((response) => {
        console.log(response.data);
        vm.isLoading = false;
        vm.getCart();
      });
    },
  },
  created() {
    this.getCart();
  },
};
</script>