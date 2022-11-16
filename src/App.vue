<script>
  import AppHeader from "@/components/AppHeader";
  import AppFooter from "@/components/AppFooter";

  export default {
    name: 'App',
    components: {
      AppHeader,
      AppFooter,
    },
  }

</script>

<template>
  <main>
    <AppHeader/>
    <router-view/>
    <AppFooter/>
  </main>
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
