import {mount} from '@vue/test-utils'
import errorPage from "@/ErrorPage";

test('should render h1 with text', () => {
    //Arrange
    const wrapper = mount(errorPage)

    //Act
    const h1Title = wrapper.get('h1')

    //Assert
    expect(h1Title.text()).toBe('Backend service or Keycloak service not available.');
})
