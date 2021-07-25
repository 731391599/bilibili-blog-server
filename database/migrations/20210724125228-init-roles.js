'use strict'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const { INTEGER, STRING } = Sequelize
		await queryInterface.createTable('roles', {
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			role_name: STRING,
			role_value: INTEGER,
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('roles')
	},
}
