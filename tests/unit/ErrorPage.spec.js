import {mount} from '@vue/test-utils'
import errorPage from "@/ErrorPage";

describe("ErrorPage.vue", () => {
    it('should render h1 with text', function () {
        //Arrange
        const wrapper = mount(errorPage)

        //Act
        const h1Title = wrapper.get('h1')

        //Assert
        expect(h1Title.text()).toBe('Backend service or Keycloak service not available.');
    });
})

