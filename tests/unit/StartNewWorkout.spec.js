import {mount} from '@vue/test-utils'
import startNewWorkout from "@/components/StartNewWorkout";

describe("StartNewWorkout.vue", () => {
    it('should render start new workout button', async () => {
        //Arrange
        const wrapper = mount(startNewWorkout)

        //Act
        const newWorkoutButton = wrapper.get('[data-test="startNewWorkoutButton"]')

        //Assert
        expect(newWorkoutButton.text()).toBe("Start New Workout")
    });
})