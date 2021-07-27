'use strict'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const { INTEGER, DATE, STRING, TEXT } = Sequelize
		await queryInterface.createTable('articles', {
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			_title: STRING, // 标题
			_cover: STRING, // 配图
			_content: TEXT, // 内容
			category_id: INTEGER, // 分类ID
			user_id: INTEGER, // 作者id
			_status: {
				type: INTEGER,
				defaultValue: 0, // 0 草稿 1 审核中 2 审核通过 3 审核拒绝 4 已发布
			}, // 状态
			show_home: {
				type: INTEGER,
				defaultValue: 0, // 0 不展示
			}, // 首页展示
			created_at: DATE,
			updated_at: DATE,
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('articles')
	},
}
