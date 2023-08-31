<template>
  <div class="row">
    <div class="col-xl-12" v-if="workoutWithExercises.workoutIsValid">
      <table>
        <th>
          <tbody>
          <div v-for="(workout, x) in workoutWithExercises" :key="workout.createdAt">
            <tr>
              <td data-test="workoutInfo">
                <h3>Workout</h3>
                <p class="name">Name: {{ workout.name }} </p>
                <p class="date">Date: {{ workout.createdAt.substring(0,10) }}</p>
                <p class="time">Time: {{ workout.createdAt.substring(11, 19) }}</p>
              </td>
              <td>
                <h3>Exercises</h3>
                <div v-for="(exercise, i) in workoutWithExercises[x].Exercises" v-bind:key="i">
                  {{ exercise.name }}
                </div>
              </td>
              <td>
                <div class="set-control-group d-flex justify-content-center align-items-center">
                  <router-link :to="'/workout/'+workout.id" class="editWorkoutButton">Edit workout</router-link>
                </div>
              </td>
            </tr>
          </div>
          </tbody>
        </th>
      </table>
    </div>
    <div v-else>
      You have no workouts. Fill the above form and click on start new workout.
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'WorkoutsTable',
  data() {
    return {
      workoutWithExercises: {}
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$keycloak.token
        }
      };
      this.workoutWithExercises.workoutIsValid = false;

      await axios.get(`${process.env.VUE_APP_BACK_END_API_URL}/workouts/user/`+this.$keycloak.profile.email, config)
          .then(async (response) => {
            this.workoutWithExercises = await response.data;
            this.workoutWithExercises.workoutIsValid = true;
          })
          .catch(async (error) => {
            this.workoutWithExercises.workoutIsValid = false;
            await this.showSnackBar('warning', 'Warning!', error.response.data);
          });

      if (await this.workoutWithExercises.workoutIsValid) {
        for (const workout of this.workoutWithExercises) {
          const index = this.workoutWithExercises.indexOf(workout);
          await axios.get(`${process.env.VUE_APP_BACK_END_API_URL}/exercises/workout/`+workout.id+`/`+this.$keycloak.profile.email, config)
              .then(async (response) => {
                this.workoutWithExercises[index].Exercises = await response.data;
              }).catch(async (error) => {
                if (await error.response.status !== 404) {
                  await this.showSnackBar('warning', 'Warning!', error.response.data);
                }
              });
        }
      }
    },
    async showSnackBar(type, title, text){
      await this.$snackbar.add({
        type: type,
        title: title,
        text: text
      });
    }
  },
}
</script>

<style scoped>

p {
  margin: 0;
}

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