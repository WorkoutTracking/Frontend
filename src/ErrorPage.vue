<script>
import AppFooter from "@/components/AppFooter";

export default {
  name: 'ErrorPage',
  components: {
    AppFooter,
  },
}
</script>


<template>
  <div class="errorPage">
    <h1>Backend service or Keycloak service not available.</h1>
  </div>
  <AppFooter/>
</template>


<style>
 .errorPage {
   height: 100vh !important;
   display: flex !important;
   justify-content: center !important;
   align-items: center !important;
 }
</style>