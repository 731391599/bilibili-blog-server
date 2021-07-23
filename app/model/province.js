'use strict'

module.exports = app => {
	const { STRING, INTEGER } = app.Sequelize
	const Province = app.model.define(
		'province',
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			name: STRING,
			provinceCode: INTEGER,
		},
		{
			timestamps: false,
		}
	)
	return Province
}
