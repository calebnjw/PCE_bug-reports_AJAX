module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'bugs',
      'user_id',
      {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        default: 1,
      },
    );
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn(
      'bugs',
      'user_id',
    );
  },
};
