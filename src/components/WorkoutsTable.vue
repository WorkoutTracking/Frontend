<template>
  <div class="row">
    <div class="col-xl-12" v-if="workoutsWithExercises">
      <table>
        <tbody>
        <div v-for="(workout, x) in workoutsWithExercises" :key="workout.created_at">
          <tr>
            <td data-test="workoutInfo">
              <h3>Workout</h3>
              Name: {{ workout.name }} <br>
              Date: {{ workout.created_at.substring(0,10) }} <br>
              Time: {{ workout.created_at.substring(11, 19) }}
            </td>
            <td>
              <h3>Exercises</h3>
              <div v-if="workoutsWithExercises[x].Exercises.length > 0">
                <div v-for="(exercise, i) in workoutsWithExercises[x].Exercises" v-bind:key="i">
                  {{ exercise.name }}
                </div>
              </div>
              <div v-else>
                No exercises
              </div>
            </td>
            <td>
              <div class="set-control-group d-flex justify-content-center align-items-center">
                <router-link :to="'/workout/'+workout.id" class="">Edit workout</router-link>
              </div>
            </td>
          </tr>
        </div>
        </tbody>
      </table>
    </div>
    <div v-else>
      You have no workouts. Fill the above form and click on start new workout.
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {onMounted, ref} from "vue";
import { getCurrentInstance } from 'vue'

export default {
  name: 'WorkoutsTable',
  setup() {
    const app = getCurrentInstance();
    const keycloak = app.appContext.config.globalProperties.$keycloak;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("vue-token")
      }
    };
    let workoutsWithExercises = ref([]);

    onMounted(async () => {
      const tempWorkoutsWithExercise = await axios.get(`${process.env.VUE_APP_BACK_END_API_URL}/workouts/user/`+keycloak.profile.email, config).then(r => r.data);
      for (const workout of tempWorkoutsWithExercise) {
        const index = tempWorkoutsWithExercise.indexOf(workout);
        tempWorkoutsWithExercise[index].Exercises = await axios.get(`${process.env.VUE_APP_BACK_END_API_URL}/exercises/workout/`+workout.id, config).then(r => r.data);
      }

      workoutsWithExercises.value = tempWorkoutsWithExercise;
    });
    return {workoutsWithExercises}
  }
}
</script>

<style scoped>

table {
  border-collapse: separate;
  border-spacing: 0 20px;
}

tr {
  background: #2E2C42;
  filter: drop-shadow(0px 3px 6px #00000020);
  display: table;
  width: 100%;
  margin-bottom: 20px;
}

td {
  color: #ffffff;
  border: none;
  padding: 0px 10px 0px 30px !important;
  max-width: 100%;
}
</style>