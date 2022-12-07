<template>
  <div v-if="workoutWithExercisesAndSets.workoutIsValid">
    <h1>Workout: {{ workoutWithExercisesAndSets.name }}</h1>
    <div class="mb-4">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div v-for="(exercise, i) in workoutWithExercisesAndSets.Exercises" v-bind:key="i">
          <div class="col-sm">
            <div
                style="padding: 15px; background-color: #2E2C42; filter: drop-shadow(0px 3px 6px #00000016); border-radius: 30px;">
              <div class="d-flex">
                <form v-on:submit.prevent="deleteExercise(exercise.id)">
                  <input type="hidden" value="exercise.id">
                  <button class="btn btn-update-set DeleteExerciseButton" type="submit">
                    <svg height="35" style="padding-right: 10px;" viewBox="0 0 35 35" width="35"
                         xmlns="http://www.w3.org/2000/svg">
                      <path id="ic_remove_circle_outline_24px"
                            d="M10.75,17.75v3.5h17.5v-3.5ZM19.5,2A17.5,17.5,0,1,0,37,19.5,17.506,17.506,0,0,0,19.5,2Zm0,31.5a14,14,0,1,1,14-14A14.019,14.019,0,0,1,19.5,33.5Z"
                            fill="#34d2c1" transform="translate(-2 -2)"/>
                    </svg>
                  </button>
                </form>

                <h3>{{ exercise.name }}</h3>
              </div>

              <div class="set-control-group mb-3 d-flex align-items-center justify-content-center">
                <label class="set-form">Sets</label>
                <label class="set-form">Reps</label>
                <label class="set-form weight">Weight</label>
                <label class="set-form">Rest</label>
              </div>

              <div v-for="(set, x) in workoutWithExercisesAndSets.Exercises[i].Sets" v-bind:key="x">
                <div class="d-flex justify-content-center">
                  <form v-on:submit.prevent="updateSet">
                    <div class="d-flex justify-content-center align-items-center">
                      <span class="set-number-count">{{ x + 1 }}</span>
                      <input type="hidden" value="set.id"/>
                      <input :placeholder="set.sets" class="set-form-control" required type="text"/>
                      <input :placeholder="set.reps" class="set-form-control" required type="text"/>
                      <input :placeholder="set.weight" class="set-form-control" required type="text"/>
                      <input :placeholder="set.rest" class="set-form-control" required type="text"/>
                      <a class="btn btn-update-set UpdateSetButton">
                        <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                          <path id="Icon_material-update"
                                d="M24.5,12.411H16.968l3.045-3.133A7.822,7.822,0,0,0,9.034,9.167a7.639,7.639,0,0,0,0,10.878,7.8,7.8,0,0,0,10.979,0,7.237,7.237,0,0,0,2.267-5.433H24.5A10.378,10.378,0,0,1,21.568,21.6a10.061,10.061,0,0,1-14.134,0A9.821,9.821,0,0,1,7.412,7.622a9.987,9.987,0,0,1,14.057,0L24.5,4.5Zm-9.445-2.356v4.722l3.889,2.311-.8,1.344L13.39,15.611V10.056Z"
                                data-name="Icon material-update"
                                fill="#34d2c1" transform="translate(-4.502 -4.5)"/>
                        </svg>
                      </a>
                    </div>
                  </form>
                  <form class="d-flex align-items-center" v-on:submit.prevent="deleteSet">
                    <div class="set-control-group">
                      <input type="hidden" value="set.Id"/>
                      <a class="btn btn-update-set DeleteSetButton">
                        <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                          <path id="ic_remove_circle_outline_24px"
                                d="M7,11v2H17V11Zm5-9A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.011,8.011,0,0,1,12,20Z"
                                fill="#34d2c1" transform="translate(-2 -2)"/>
                        </svg>
                      </a>
                    </div>
                  </form>
                </div>
              </div>
              <form style="padding-top: 20px;" v-on:submit.prevent="createSet">
                <div class="d-flex justify-content-center" style="margin-top: -15px;">
                  <input type="hidden" value="@exercise.Id"/>
                  <a class="btn btn-update-set CreateSetButton">
                    <svg height="30" viewBox="0 0 30 30" width="30" xmlns="http://www.w3.org/2000/svg">
                      <path id="ic_add_circle_outline_24px"
                            d="M18.5,9.5h-3v6h-6v3h6v6h3v-6h6v-3h-6ZM17,2A15,15,0,1,0,32,17,15.005,15.005,0,0,0,17,2Zm0,27A12,12,0,1,1,29,17,12.016,12.016,0,0,1,17,29Z"
                            fill="#34d2c1" transform="translate(-2 -2)"/>
                    </svg>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <form v-on:submit.prevent="createExercise">
        <div class="mb-3">
          <input id="name" v-model="form.name" class="form-control" placeholder="Exercise name" type="text">
        </div>
        <div class="d-flex justify-content-end align-items-center"
             style="border-radius: 27px; border: 2px solid #34D2C1;">
          <div class="d-flex justify-content-end align-items-center" style="padding: 6px;">
            <button :disabled="!addExerciseFormIsValid" class="d-flex align-items-center btn btn-update-set"
                    style="padding-right: 2.2vw; padding-left: 3vw;"
                    type="submit">
              Add New Exercise
              <svg class="d-flex" height="30" style="padding-left: 10px;" viewBox="0 0 30 30" width="30"
                   xmlns="http://www.w3.org/2000/svg">
                <path id="ic_add_circle_outline_24px"
                      d="M18.5,9.5h-3v6h-6v3h6v6h3v-6h6v-3h-6ZM17,2A15,15,0,1,0,32,17,15.005,15.005,0,0,0,17,2Zm0,27a12.17,12.17,0,0,1-6.82-2.132A11.865,11.865,0,0,1,5,17,12,12,0,1,1,17,29Z"
                      fill="#34d2c1" transform="translate(-2 -2)"/>
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <div v-else>
    Workout not found.
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "WorkoutComponent",
  data() {
    return {
      workoutWithExercisesAndSets: {},
      config: {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("vue-token")
        }
      },
      form: {
        name: ''
      }
    }
  },
  computed: {
    addExerciseFormIsValid() {
      return !!this.form.name
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      let tempWorkoutWithExercisesAndSets = await axios.get(`${process.env.VUE_APP_BACK_END_API_URL}/workouts/` + this.$route.params.id + `/` + this.$keycloak.profile.email, this.config).then(r => r.data)
          .catch((err) => {
            tempWorkoutWithExercisesAndSets.workoutIsValid = err.response.status !== 404;
          });
      tempWorkoutWithExercisesAndSets.Exercises = await axios.get(`${process.env.VUE_APP_BACK_END_API_URL}/exercises/workout/` + tempWorkoutWithExercisesAndSets.id, this.config).then(r => r.data);
      tempWorkoutWithExercisesAndSets.workoutIsValid = true;
      for (const exercise of tempWorkoutWithExercisesAndSets.Exercises) {
        const index = tempWorkoutWithExercisesAndSets.Exercises.indexOf(exercise);
        tempWorkoutWithExercisesAndSets.Exercises[index].Sets = await axios.get(`${process.env.VUE_APP_BACK_END_API_URL}/sets/exercise/` + exercise.id, this.config).then(r => r.data);
      }
      this.workoutWithExercisesAndSets = tempWorkoutWithExercisesAndSets;
    },
    async deleteExercise(exercise_id) {
      await axios.delete(`${process.env.VUE_APP_BACK_END_API_URL}/exercises/` + exercise_id + `/` + this.$keycloak.profile.email, this.config)
          .then(() => {
            //snackbar
            this.getData();
          })
          .catch((error) => {
            console.log(error)
          });
    },
    async createExercise() {
      if (this.addExerciseFormIsValid) {
        await axios.post(`${process.env.VUE_APP_BACK_END_API_URL}/exercises/` + this.$route.params.id + `/` + this.form.name + `/` + this.$keycloak.profile.email, {}, this.config)
            .then(() => {
              this.form.name = '';
              this.getData();
            })
            .catch((error) => {
              console.log(error)
            });
      }
    }
  }
}
</script>

<style scoped>
.set-form-control {
  width: 12%;
  padding: .375rem .75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #fff;
  background-color: #2E2C42;
  background-clip: padding-box;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: .25rem;
  margin: 4px;
  margin-right: 10px;
}

.set-form {
  padding: .375rem .75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #fff;
}

.btn-update-set {
  color: #34D2C1;
  padding: 0px;
  margin: 0px;
}

.btn:disabled {
  border: none;
}
</style>