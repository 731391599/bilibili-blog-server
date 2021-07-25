'use strict'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const { INTEGER, DATE, STRING } = Sequelize
		await queryInterface.createTable('menus', {
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			path: {
				type: STRING,
				field: '_path',
			}, // 路径
			menu_name: STRING,
			icon: {
				type: STRING,
				field: '_icon',
			},
			component: {
				type: STRING,
				field: '_component',
			},
			pid: {
				type: INTEGER,
				field: '_pid',
			},
			role_level: {
				type: STRING,
				defaultValue: '[1,2,3]',
			},
			created_at: DATE,
			updated_at: DATE,
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('menus')
	},
}
