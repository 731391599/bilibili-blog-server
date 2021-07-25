'use strict'

module.exports = app => {
	const { STRING, INTEGER, DATE } = app.Sequelize

	const UserInfo = app.model.define('user_info', {
		id: { type: INTEGER, primaryKey: true, autoIncrement: true },
		userId: INTEGER, // 对应users表中的id
		name: {
			type: STRING(30),
			field: '_name',
		}, // 用户昵称
		avatar: {
			type: STRING,
			field: '_avatar',
		}, // 用户的头像
		mobile: {
			type: STRING,
			field: '_mobile',
		},
		provinceId: INTEGER, // 省ID
		cityId: INTEGER, // 市ID
		areaId: INTEGER, // 区ID
		roleId: INTEGER,
		createdAt: DATE,
		updatedAt: DATE,
	})

	UserInfo.associate = function () {
		app.model.UserInfo.belongsTo(app.model.Role, {
			targetKey: 'id',
			foreignKey: 'roleId',
		})
	}

	return UserInfo
}
