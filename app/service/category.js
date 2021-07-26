'use strict'
const { Service } = require('egg')

class CategoryService extends Service {
	constructor(ctx) {
		super(ctx)
	}

	async create(body) {
		const { ctx } = this
		try {
			await ctx.model.Category.create({
				...body,
			})
			return 'success'
		} catch (e) {
			console.log(e)
			return '服务端错误'
		}
	}

	async index(query) {
		const { ctx } = this
		try {
			const { pageSize, pageNum } = query
			const offset = (pageNum - 1) * pageSize
			const options = {
				limit: pageSize * 1,
				offset,
			}
			const data = await ctx.model.Category.findAndCountAll(options)
			return {
				status: 'success',
				data: data,
			}
		} catch (e) {
			return {
				status: '服务端错误',
			}
		}
	}

	async update(id, body) {
		const { ctx } = this
		try {
			await ctx.model.Category.update(
				{ ...body },
				{
					where: { id },
				}
			)
			return 'success'
		} catch (e) {
			return '服务端错误'
		}
	}

	async destroy(id) {
		try {
			const data = await this.ctx.model.Category.destroy({
				where: { id },
			})
			if (data == 0) {
				return '该数据不存在'
			}
			return 'success'
		} catch (e) {
			return '服务端错误'
		}
	}
}

module.exports = CategoryService
