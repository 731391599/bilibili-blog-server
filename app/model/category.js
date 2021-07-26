'use strict'
// 这里model有个bug 需要修复一下
module.exports = app => {
	const { STRING, INTEGER, DATE } = app.Sequelize
	const Category = app.model.define('category', {
		id: { type: INTEGER, primaryKey: true, autoIncrement: true },
		name: {
			type: STRING,
			field: '_name',
		},
		createdAt: DATE,
		updatedAt: DATE,
	})

    
	return Category
}
