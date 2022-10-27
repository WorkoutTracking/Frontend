<template>
  <div>
    <h1>Workouts tes</h1>

    <div v-if="areWorkoutsLoaded">
      <div v-for="(workout, index) in workouts" v-bind:key="index">
        <div>
          Index = {{ index }}
          <br>
          Id: {{ workout.id }}
          <br>
          Name: {{ workout.name }}
        </div>
        <br>
      </div>
    </div>
    <div v-else>
      <p>Loading workout data...</p>
    </div>

    <div v-if="areExercisesLoaded">
      <h2>Exercises</h2>
      <div v-for="(exercise, index) in exercises" v-bind:key="index">
        <div>
          Index = {{ index }}
          <br>
          Id: {{ exercise.id }}
          <br>
          Name: {{ exercise.name }}
        </div>
        <br>
      </div>
    </div>
    <div v-else>
      <p>Loading exercise data...</p>
    </div>
  </div>
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
      workouts: {},
      exercises: {},
      areWorkoutsLoaded: false,
      areExercisesLoaded: false,
      form: {
        name: ''
      }
    }
  },
  mounted() {
    this.getWorkouts();
    this.getExercises();
  },
  methods: {
    async getWorkouts(){
      const config = {
        headers: {
          'Accept': 'application/json'
        }
      }
      axios.get(`${process.env.VUE_APP_BACK_END_API_URL}/workouts`, config).then((response) => {
        // Check the response was a success
        if(response.status === 200) {
          this.workouts = response.data;
          this.areWorkoutsLoaded = true;
        }
      });
    },
    async getExercises(){
      const config = {
        headers: {
          'Accept': 'application/json'
        }
      }
      axios.get(`${process.env.VUE_APP_BACK_END_API_URL}/exercises`, config).then((response) => {
        // Check the response was a success
        if(response.status === 200) {
          this.exercises = response.data;
          this.areExercisesLoaded = true;
        }
      });
    },
    async startWorkout(){
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      axios.post(`${process.env.VUE_APP_BACK_END_API_URL}/workouts`, { name: this.form.name }, {config})
          .then(() => {
            this.getWorkouts()
            this.getExercises()
            this.form.name = ''
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
