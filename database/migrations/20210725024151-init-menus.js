'use strict'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const { INTEGER, DATE, STRING } = Sequelize
		await queryInterface.createTable('menus', {
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			_path: STRING,
			menu_name: STRING,
			_icon: STRING,
			_component: STRING,
			_pid: INTEGER,
			role_level: {
				type: STRING,
				defaultValue: '[1,2,3]',
			},
			_redirect: STRING,
			_props: { // 是否可以接收参数
				type: INTEGER,
				defaultValue: 0,
			},
			_hide: { // 菜单是否隐藏
				type: INTEGER,
				defaultValue: 0,
			},
			created_at: DATE,
			updated_at: DATE,
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('menus')
	},
}
