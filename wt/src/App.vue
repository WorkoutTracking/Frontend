<script>
  import AppHeader from "@/components/AppHeader";
  import AppFooter from "@/components/AppFooter";
  export default {
    components: {
      AppHeader,
      AppFooter
    },
  }

</script>

<template>
  <AppHeader/>
  <router-view/>
  <AppFooter/>
</template>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
