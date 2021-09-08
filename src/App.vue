<template>
  <div id="app">
        <Loading :active.sync="isLoading"></Loading>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
    // console.log(process.env.APIPATH, process.env.CUSTOMPATH);
    this.$http.get(api).then((response)=>{
      console.log(response.data);
    });
  },
  computed:{
    isLoading() {
      return this.$store.state.isLoading;
    },
  }
}
</script>

<style lang="scss">
@import "./assets/all";

</style>
