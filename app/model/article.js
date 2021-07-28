'use strict'
// 这里model有个bug 需要修复一下
module.exports = app => {
	const { STRING, INTEGER, DATE, TEXT } = app.Sequelize
	const Article = app.model.define('article', {
		id: { type: INTEGER, primaryKey: true, autoIncrement: true },
		title: {
			type: STRING,
			field: '_title',
		}, // 标题
		cover: {
			type: STRING,
			field: '_cover',
		}, // 配图
		content: {
			type: TEXT,
			field: '_content',
		}, // 内容
		categoryId: INTEGER, // 分类ID
		userId: INTEGER, // 作者id
		status: {
			type: INTEGER,
			field: '_status', // 0 草稿 1 审核中 2 审核通过 3 审核拒绝 4 已发布
		}, // 状态
		showHome: INTEGER, // 首页展示
		createdAt: DATE,
		updatedAt: DATE,
	})

	Article.associate = function () {
		app.model.Article.belongsTo(app.model.User, {
			targetKey: 'id',
			foreignKey: 'userId',
		})
        app.model.Article.belongsTo(app.model.Category, {
			targetKey: 'id',
			foreignKey: 'categoryId',
		})
	}

	return Article
}
