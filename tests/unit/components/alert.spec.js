import { mount } from '@vue/test-utils';
import Alert from '@/components/Alert.vue';

describe('components/Alert.vue', () => {
    it('renders an danger alert', () => {
        const wrapper = mount(Alert, {
            propsData: {
                message: "Danger alert message",
                className: "danger"
            }
        });

        expect(wrapper.text()).toMatch("Danger alert message");
        expect(wrapper.find('.alert-danger').exists()).toBe(true);
    });

    it('renders an success alert', () => {
        const wrapper = mount(Alert, {
            propsData: {
                message: "Success alert message",
                className: "success"
            }
        });

        expect(wrapper.text()).toMatch("Success alert message");
        expect(wrapper.find('.alert-success').exists()).toBe(true);
    });
});