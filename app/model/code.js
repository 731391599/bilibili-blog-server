'use strict'
// 这里model有个bug 需要修复一下
module.exports = app => {
	const { STRING, INTEGER, DATE } = app.Sequelize
	const Code = app.model.define('code', {
		id: { type: INTEGER, primaryKey: true, autoIncrement: true },
		code: {
			type: STRING(8),
			field: '_code',
		},
		status: {
			type: INTEGER,
			field: '_status',
		},
		createdAt: DATE,
		updatedAt: DATE,
	})
	return Code
}
