import faker from 'faker';
import { Factory } from 'miragejs';

export default {
  message: Factory.extend({
    content() {
      return faker.fake('{{lorem.paragraph}}');
    },
    date() {
      const date = new Date(faker.fake('{{date.past}}'));
      return date.toLocaleDateString();
    },
  }),
};
