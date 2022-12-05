
<template>
  Workout: {{workoutWithExercisesAndSets.name}}
  <div class="mb-4">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

      <div v-for="(exercise, i) in workoutWithExercisesAndSets.Exercises" v-bind:key="i">
        <div class="col-sm">
          <div style="padding: 15px; background-color: #2E2C42; filter: drop-shadow(0px 3px 6px #00000016); border-radius: 30px;">
            <div class="d-flex">

              <form v-on:submit.prevent="DeleteExercise">
                <input type="hidden" :value="exercise.id" />
                <a class="btn btn-update-set DeleteExerciseButton">
                  <svg style="padding-right: 10px;" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35">
                    <path id="ic_remove_circle_outline_24px" d="M10.75,17.75v3.5h17.5v-3.5ZM19.5,2A17.5,17.5,0,1,0,37,19.5,17.506,17.506,0,0,0,19.5,2Zm0,31.5a14,14,0,1,1,14-14A14.019,14.019,0,0,1,19.5,33.5Z" transform="translate(-2 -2)" fill="#34d2c1"/>
                  </svg>
                </a>
              </form>

              <h3>{{exercise.name}}</h3>
            </div>

            <div class="set-control-group mb-3 d-flex align-items-center justify-content-center">
              <label class="set-form">Sets</label>
              <label class="set-form">Reps</label>
              <label class="set-form weight">Weight</label>
              <label class="set-form">Rest</label>
            </div>

            <div v-for="(set, x) in workoutWithExercisesAndSets.Exercises[i].Sets" v-bind:key="x">
              <div class="d-flex justify-content-center">
                <form v-on:submit.prevent="UpdateSet">
                  <div class="d-flex justify-content-center align-items-center">
                    <span class="set-number-count">#1</span>
                    <input type="hidden" value="set.id"/>
                    <input type="text" required :placeholder="set.sets" class=""/>
                    <input type="text" required :placeholder="set.reps" class=""/>
                    <input type="text" required :placeholder="set.weight" class=""/>
                    <input type="text" required :placeholder="set.rest" class=""/>
                    <a class="btn btn-update-set UpdateSetButton">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <path id="Icon_material-update" data-name="Icon material-update" d="M24.5,12.411H16.968l3.045-3.133A7.822,7.822,0,0,0,9.034,9.167a7.639,7.639,0,0,0,0,10.878,7.8,7.8,0,0,0,10.979,0,7.237,7.237,0,0,0,2.267-5.433H24.5A10.378,10.378,0,0,1,21.568,21.6a10.061,10.061,0,0,1-14.134,0A9.821,9.821,0,0,1,7.412,7.622a9.987,9.987,0,0,1,14.057,0L24.5,4.5Zm-9.445-2.356v4.722l3.889,2.311-.8,1.344L13.39,15.611V10.056Z" transform="translate(-4.502 -4.5)" fill="#34d2c1"/>
                      </svg>
                    </a>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
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
    let workoutWithExercisesAndSets = ref([]);
    onMounted(async () => {
      let tempWorkoutWithExercisesAndSets = await axios.get(`${process.env.VUE_APP_BACK_END_API_URL}/workouts/`+route.params.id, config).then(r => r.data);
      tempWorkoutWithExercisesAndSets.Exercises = await axios.get(`${process.env.VUE_APP_BACK_END_API_URL}/exercises/workout/`+tempWorkoutWithExercisesAndSets.id, config).then(r => r.data);

      for (const exercise of tempWorkoutWithExercisesAndSets.Exercises) {
        const index = tempWorkoutWithExercisesAndSets.Exercises.indexOf(exercise);
        tempWorkoutWithExercisesAndSets.Exercises[index].Sets = await axios.get(`${process.env.VUE_APP_BACK_END_API_URL}/sets/exercise/`+exercise.id, config).then(r => r.data);
      }


      workoutWithExercisesAndSets.value = tempWorkoutWithExercisesAndSets;
    });

    return {workoutWithExercisesAndSets}
  }
}
</script>

<style scoped>

</style>