'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const featureList = [
      {
        name: faker.commerce.department(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: faker.commerce.department(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: faker.commerce.department(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: faker.commerce.department(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: faker.commerce.department(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert(
      'features',
      featureList,
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('features', null, {});
  },
};
