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
* {
  background-color: #2D2B41;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #ffffff;
}
</style>
