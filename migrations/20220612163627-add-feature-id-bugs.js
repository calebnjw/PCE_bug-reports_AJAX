module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'bugs',
      'feature_id',
      {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'features',
          key: 'id',
        },
      },
    );
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn(
      'bugs',
      'feature-id',
    );
  },
};
