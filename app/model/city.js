'use strict'

module.exports = app => {
	const { STRING, INTEGER } = app.Sequelize
	const City = app.model.define(
		'city',
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			name: STRING,
			provinceCode: INTEGER,
			cityCode: INTEGER,
		},
		{
			timestamps: false,
		}
	)
	return City
}
