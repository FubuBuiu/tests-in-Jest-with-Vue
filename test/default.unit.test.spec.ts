import Vue from 'vue';
import Vuetify from 'vuetify';
import { expect } from '@jest/globals';
import { mount, createLocalVue } from '@vue/test-utils';
import { CartManager } from '~/managers/CartManager';
import CartSideMenu from '@/components/cart-side-menu.vue';
import DefaultLayout from '@/layouts/default.vue';

Vue.use(Vuetify);

let localVue: any;
let vuetify: any;

describe('Default Layout', () => {
  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
  });
  test('should mount Cart', () => {
    const wrapper = mount(DefaultLayout, {
      localVue,
      vuetify,
      stubs: { Nuxt: true },
      mocks: {
        $cart: new CartManager(),
      },
    });

    expect(wrapper.findComponent(CartSideMenu).exists()).toBe(true);
  });
  test('should toggle Cart visibility', async () => {
    const wrapper = mount(DefaultLayout, {
      localVue,
      vuetify,
      stubs: { Nuxt: true },
      mocks: {
        $cart: new CartManager(),
      },
    });

    const buttons = wrapper.find('[data-testid="cartButton"]');

    expect((wrapper.vm as any).cartIsVisible).toBe(false);
    await buttons.trigger('click');
    expect((wrapper.vm as any).cartIsVisible).toBe(true);
  });
});
