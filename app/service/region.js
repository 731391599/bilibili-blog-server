'use strict'
const { Service } = require('egg')

class RegionService extends Service {
	constructor(ctx) {
		super(ctx)
	}

	async province() {
		const data = await this.ctx.model.Province.findAll()
		return data
	}

	async city(id) {
		const data = await this.ctx.model.City.findAll({
			where: {
				provinceCode: id,
			},
		})
		return data
	}

	async area(id) {
		const data = await this.ctx.model.Area.findAll({
			where: {
				cityCode: id,
			},
		})
		return data
	}
}

module.exports = RegionService
