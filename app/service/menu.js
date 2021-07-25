'use strict'
const { Service } = require('egg')

class MenuService extends Service {
	constructor(ctx) {
		super(ctx)
	}

	async create(body) {
		const { ctx } = this
		try {
			await ctx.model.Menu.create({
				...body,
			})
			return 'success'
		} catch (e) {
			console.log(e)
			return '服务端错误'
		}
	}
}

module.exports = MenuService
