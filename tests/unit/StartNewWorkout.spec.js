import {mount} from '@vue/test-utils'
import startNewWorkout from "@/components/StartNewWorkout";

describe("StartNewWorkout.vue", () => {
    it('should render input for a new workout', function () {
        //Arrange
        const wrapper = mount(startNewWorkout)

        //Act
        const newWorkoutInput = wrapper.get('.form-control')

        //Assert
        expect(newWorkoutInput.element).toBeTruthy();
    });

    it('should render start new workout button', async () => {
        //Arrange
        const wrapper = mount(startNewWorkout)

        //Act
        const newWorkoutButton = wrapper.get('.btn-add-workout')

        //Assert
        expect(newWorkoutButton.text()).toBe("Start New Workout")
    });

    it('should test', function () {
        //Arrange
        const wrapper = mount(startNewWorkout)

        //Assert
        expect(wrapper.vm.formIsValid).toBeFalsy()
    });
})