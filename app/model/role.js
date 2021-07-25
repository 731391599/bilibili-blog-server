'use strict'

module.exports = app => {
	const { STRING, INTEGER } = app.Sequelize

	const Role = app.model.define(
		'role',
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			roleName: STRING,
			roleValue: INTEGER,
		},
		{
			timestamps: false,
		}
	)

	return Role
}
