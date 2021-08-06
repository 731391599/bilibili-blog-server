'use strict'

module.exports = app => {
	const { STRING, INTEGER, DATE } = app.Sequelize
	const User = app.model.define('user', {
		id: { type: INTEGER, primaryKey: true, autoIncrement: true },
		username: {
			type: STRING(30),
			field: '_username',
		}, // 用户名
		password: {
			type: STRING(30),
			field: '_password',
		}, // 密码
		status: {
			type: INTEGER,
			field: '_status',
		},
		code: {
			type: STRING(8),
			field: '_code',
		},
		createdAt: DATE,
		updatedAt: DATE,
	})
	// 表关联
	// users表中的 userId 对应 userInfos表中的 id
	User.associate = function () {
		console.log(app.model.User, 111111)
		app.model.User.belongsTo(app.model.UserInfo, {
			targetKey: 'userId',
			foreignKey: 'id',
		})
	}
	return User
}
