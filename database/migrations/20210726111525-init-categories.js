'use strict'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const { INTEGER, DATE, STRING } = Sequelize
		await queryInterface.createTable('categories', {
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			_name: STRING,
			created_at: DATE,
			updated_at: DATE,
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('categories')
	},
}
