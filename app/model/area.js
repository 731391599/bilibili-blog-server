'use strict'

module.exports = app => {
	const { STRING, INTEGER } = app.Sequelize
	const Area = app.model.define(
		'area',
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			name: STRING,
			cityCode: INTEGER,
			areaCode: INTEGER,
		},
		{
			timestamps: false,
		}
	)
	return Area
}
