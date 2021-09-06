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
        </div>
      </div>
    </nav>
  </div>
</template>

<script>

export default {
  name: "Navbar",
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
        console.log("cart:", response.data.data.carts);
        vm.isLoading = false;
        vm.cart = response.data.data;
        // console.log('cart:',vm.cart);
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