'use strict'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const { INTEGER, DATE, STRING, ARRAY } = Sequelize
		await queryInterface.createTable('menus', {
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			_path: STRING, // 路径
			_icon: STRING, // 图标
			_component: STRING, // 组件路径
			_pid: INTEGER,
			role_level: ARRAY, // 路由权限
			created_at: DATE,
			updated_at: DATE,
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('menus')
	},
}
