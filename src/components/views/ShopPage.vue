<template>
  <div>
    <!-- <ShopNavBar /> -->
    <AlertMessage />
    <div class="container-fluid p-0">
        <!-- <ShopSideBar /> -->
        <router-view></router-view>
    </div>
  </div>
</template>
<script>
import ShopNavBar from "@/components/views/ShopNavBar.vue";
import AlertMessage from "../AlertMessage.vue";
import ShopSideBar from "@/components/views/ShopSideBar";

export default {
  name: "mainpage",
  components: {
    ShopNavBar,
    ShopSideBar,
    AlertMessage,
  },
  created() {
    const myCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // console.log("myCookie:" + myCookie);
    this.$http.defaults.headers.common.Authorization = myCookie;
  },
};
</script>