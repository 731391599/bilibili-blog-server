'use strict'
// 这里model有个bug 需要修复一下
module.exports = app => {
	const { STRING, INTEGER, DATE } = app.Sequelize
	const Menu = app.model.define('menu', {
		id: { type: INTEGER, primaryKey: true, autoIncrement: true },
		path: {
			type: STRING,
			field: '_path',
		}, // 路径
		menuName: STRING,
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
		redirect: {
			type: STRING,
			field: '_redirect',
		},
		roleLevel: STRING,
		createdAt: DATE,
		updatedAt: DATE,
	})

    
	return Menu
}
