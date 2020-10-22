import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from "vuex";
import Login from "@/views/Login.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
let submittedPayload = false;

const store = new Vuex.Store({
    actions: {
        login(_, payload) {
            submittedPayload = payload;
        }
    }
});

describe("views/Login.vue", () => {
    
    it("shows a login form", async () => {
        
        const wrapper = mount(Login, {
            localVue,
            store
        });

        await wrapper.find("#email").setValue("email@email.gr");
        await wrapper.find("#password").setValue("password");
        await wrapper.find("input[type=submit]").trigger("click.prevent");

        expect(submittedPayload).toEqual({email: "email@email.gr", password: "password"});

    });
})