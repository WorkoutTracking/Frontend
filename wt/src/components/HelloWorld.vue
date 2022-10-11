<template>
  <div class="hello">
    <h1>Users</h1>

    <div v-if="isLoaded">
      <p>{{ users }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      users: {},
      isLoaded: false
    }
  },
  mounted() {
    this.getUserData();
  },
  methods: {
    async getUserData(){
      console.log(process.env.VUE_APP_BACK_END_API_URL)
      let config = {
        headers: {
          'Accept': 'application/json'
        }
      }
      axios.get(`${process.env.VUE_APP_BACK_END_API_URL}`, config).then((response) => {
        this.isLoaded = true;
        // Check the response was a success
        if(response.status === 200)
        {
          this.users = response.data;
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
