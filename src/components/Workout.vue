<template>
  <Suspense>
    <template #default>
      <div>
        {{workoutWithExercises.name}}
        <br>
        <div v-for="(exercise, i) in workoutWithExercises.Exercises" v-bind:key="i">
          {{ exercise.name }}
        </div>
      </div>
    </template>
    <template #fallback>
      Loading data or data could not be loading...
    </template>
  </Suspense>

</template>

<script>
import axios from "axios";
import { useRoute } from 'vue-router'
import {onMounted, ref} from "vue";

export default {
  name: "WorkoutComponent",
  setup() {
    const route = useRoute()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("vue-token")
      }
    };
    let workoutWithExercises = ref([]);
    onMounted(async () => {
      let tempWorkoutWithExercises = await axios.get(`${process.env.VUE_APP_BACK_END_API_URL}/workouts/`+route.params.id, config).then(r => r.data);
      tempWorkoutWithExercises.Exercises = await axios.get(`${process.env.VUE_APP_BACK_END_API_URL}/exercises/workout/`+tempWorkoutWithExercises.id, config).then(r => r.data);
      workoutWithExercises.value = tempWorkoutWithExercises;
    });

    return {workoutWithExercises}
  }
}
</script>

<style scoped>

</style>