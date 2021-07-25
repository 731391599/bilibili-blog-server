'use strict'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const { INTEGER, DATE, STRING } = Sequelize
		await queryInterface.createTable('menus', {
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			_path: STRING, // 路径
			menu_name: STRING, // 菜单名
			_icon: STRING, //图标
			_component: STRING, //组件路径
			_pid: INTEGER, // 父级ID
			role_level: {
				type: STRING,
				defaultValue: '[1,2,3]', // 权限
			},
			created_at: DATE,
			updated_at: DATE,
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('menus')
	},
}
