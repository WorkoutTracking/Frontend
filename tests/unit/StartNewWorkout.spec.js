import {mount} from '@vue/test-utils'
import startNewWorkout from "@/components/StartNewWorkout";

test('Should render input for a new workout', () => {
    //Arrange
    const wrapper = mount(startNewWorkout)

    //Act
    const newWorkoutInput = wrapper.get('.form-control')

    //Assert
    expect(newWorkoutInput.element).toBeTruthy();
})

test('Should render start new workout button', () => {
    //Arrange
    const wrapper = mount(startNewWorkout)

    //Act
    const newWorkoutButton = wrapper.get('.btn-add-workout')

    //Assert
    expect(newWorkoutButton.text()).toBe("Start New Workout")
})

test('Should check if form is not valid because the input is not filled', () => {
    //Arrange
    const wrapper = mount(startNewWorkout)

    //Assert
    expect(wrapper.vm.formIsValid).toBeFalsy()
})