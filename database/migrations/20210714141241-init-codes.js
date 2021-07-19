'use strict'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const { INTEGER, DATE, STRING } = Sequelize
		await queryInterface.createTable('codes', {
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			_code: STRING(8), // 邀请码
			_status: {
				// 使用状态
				type: INTEGER,
				defaultValue: 0, // 默认值1 1已使用 0未使用
			},
			created_at: DATE,
			updated_at: DATE,
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('codes')
	},
}
