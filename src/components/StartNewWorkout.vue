<template>
  <form v-on:submit.prevent="startWorkout">
    <div class="mb-3 col-2">
      <input id="name" v-model="form.name" class="form-control" placeholder="Workout name" type="text">
    </div>
    <button :disabled="!formIsValid" class="btn btn-lg btn-add-workout" data-test="startNewWorkoutButton" type="submit">
      Start New Workout
    </button>
  </form>
</template>

<script>
import axios from 'axios';
import router from "@/router";

export default {
  name: 'StartNewWorkout',
  data() {
    return {
      form: {
        name: ''
      }
    }
  },
  computed: {
    formIsValid() {
      return !!this.form.name
    }
  },
  methods: {
    async startWorkout() {
      if (this.formIsValid) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("vue-token")
          }
        };

        await axios.post(`${process.env.VUE_APP_BACK_END_API_URL}/workouts/` + this.form.name + `/` + this.$keycloak.profile.email, {}, config)
            .then((res) => {
              this.form.name = '';
              //Go to overview of workout. give the location with it and make axios request with this link to get workout info. then make axios request for all exercises
              router.push('/workout/' + res.data.id)
            })
            .catch((error) => {
              console.log(error)
            });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-add-workout {
  color: white;
  border: none;
  background: linear-gradient(270deg, #5782FF 0%, #34D2C1 42.1%, #34D2C1 100%);
  padding: 5px 50px;
  border-radius: 55px;
  font-size: 18px;
}
</style>
