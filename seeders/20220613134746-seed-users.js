'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const userList = [
      {
        email: faker.name.findName(),
        password: faker.word.adjective(10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: faker.name.findName(),
        password: faker.word.adjective(10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: faker.name.findName(),
        password: faker.word.adjective(10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert(
      'users',
      userList,
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
