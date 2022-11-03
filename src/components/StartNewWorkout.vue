<template>
  <div>
    start workout
    <form v-on:submit.prevent="startWorkout">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" placeholder="Workout name" v-model="form.name">
      </div>

      <div class="form-group">
        <button class="btn btn-primary">Submit</button>
      </div>
    </form>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'StartNewWorkout',
  props: {
    msg: String
  },
  data () {
    return {
      form: {
        name: ''
      }
    }
  },
  methods: {
    async startWorkout(){
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      axios.post(`${process.env.VUE_APP_BACK_END_API_URL}/workouts`, { name: this.form.name }, {config})
          .then(() => {
            this.form.name = ''
            window.location.reload()
          })
          .catch((error) => {
            console.log(error)
          });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
