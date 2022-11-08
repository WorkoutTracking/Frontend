<template>
  <div v-if="isAuthenticated">
    <h1>Workouts</h1>

    <div v-if="areWorkoutsLoaded">
      <div v-for="(workout, index) in workouts" v-bind:key="index">
        <div>
          Index = {{ index }}
          <br>
          Id: {{ workout.id }}
          <br>
          Name: {{ workout.name }}
          <br>
          User email: {{ workout.user_email }}
        </div>
        <br>
      </div>
    </div>
    <div v-else>
      <p>Loading workout data...</p>
    </div>

    <div v-if="areExercisesLoaded">
      <h2>Exercises</h2>
      <div v-for="(exercises, i) in multiArrExercises" :key="i">
        {{i}}
        <div v-for="(exercise, index) in exercises" :key="index">
          Index = {{ index }}
          <br>
          Id: {{ exercise.id }}
          <br>
          Name: {{ exercise.name }}
          <br>
          Workout ID: {{ exercise.workout_id }}
          <br>
          <br>

        </div>
        <br>
        <br>
      </div>
    </div>
    <div v-else>
      <p>Loading exercise data...</p>
    </div>
  </div>
  <div v-else>
    Not logged in
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'WorkoutsTable',
  props: {
    msg: String
  },
  data () {
    return {
      workouts: [],
      multiArrExercises: [],
      areWorkoutsLoaded: false,
      areExercisesLoaded: false,
      isAuthenticated: this.$auth0.isAuthenticated,
    }
  },
  mounted() {
    this.getWorkouts();
  },
  methods: {
    async getWorkouts(){
      const config = {
        headers: {
          'Accept': 'application/json'
        }
      }
      await axios.get(`${process.env.VUE_APP_BACK_END_API_URL}/workouts`, config).then((response) => {
        // Check the response was a success
        if(response.status === 200) {
          this.workouts = response.data;
          this.areWorkoutsLoaded = true;
          Array.from(this.workouts).forEach((workout) =>{
            console.log(workout.id);
            this.getWorkoutExercises(workout.id);
          });
        }
      });
    },
    async getWorkoutExercises(workout_id){
      const config = {
        headers: {
          'Accept': 'application/json'
        }
      }
      await axios.get(`${process.env.VUE_APP_BACK_END_API_URL}/exercises/workout/`+workout_id, config).then((response) => {
        // Check the response was a success
        if(response.status === 200) {
          console.log(response.data)

          this.multiArrExercises.push(response.data);
          this.areExercisesLoaded = true;
        }
      });
      console.log(this.multiArrExercises);
    }
  }
}
</script>

<style scoped>

</style>