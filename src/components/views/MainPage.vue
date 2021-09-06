<template>
    <div>
        <Navbar/>
        <AlertMessage/>
        <div class="container-fluid">
            <div class="row">
                <Sidebar/>
                <router-view></router-view>
            </div>
            
        </div>

    </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import AlertMessage from "../AlertMessage.vue";

export default {
    name: 'mainpage',
    components: {
        Navbar,
        Sidebar,
        AlertMessage,
    },
    created() {
    const myCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,'$1'
    );
    // console.log("myCookie:" + myCookie);
    this.$http.defaults.headers.common.Authorization = myCookie;
  },
};
</script>