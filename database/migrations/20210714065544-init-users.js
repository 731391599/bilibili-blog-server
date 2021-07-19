'use strict'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const { INTEGER, DATE, STRING } = Sequelize
		await queryInterface.createTable('user_infos', {
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			user_id: INTEGER, // 对应users表中的id
			_name: STRING(30), // 用户昵称
			_avatar: STRING, // 用户的头像
			_mobile: {
				type: STRING,
				unique: true, // 唯一的
			},
			province_id: INTEGER, // 省ID
			city_id: INTEGER, // 市ID
			area_id: INTEGER, // 区ID
			role_id: {
				type: INTEGER,
				defaultValue: 2,  // 默认值是2 关联后面的权限表
			},
			created_at: DATE,
			updated_at: DATE,
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('user_infos')
	},
}
