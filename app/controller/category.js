'use strict'
const { Controller } = require('egg')

const createRule = {
	name: 'string',
}

const indexRule = {
	pageSize: 'string',
	pageNum: 'string',
}

class CategoryController extends Controller {
	async create() {
		const { ctx } = this
		try {
			ctx.validate(createRule, ctx.request.body)
			const status = await ctx.service.category.create(ctx.request.body)
			if (status === 'success') {
				ctx.helper.success()
			} else {
				ctx.helper.error(status)
			}
		} catch (e) {
			ctx.helper.error(e)
		}
	}

	async index() {
		const { ctx } = this
		try {
			ctx.validate(indexRule, ctx.request.query)
			const body = await ctx.service.category.index(ctx.request.query)
			if (body.status === 'success') {
				ctx.helper.success(body.data)
			} else {
				ctx.helper.success(body)
			}
		} catch (e) {
			ctx.helper.error(e)
		}
	}

	async update() {
		const { ctx } = this
		const { id } = ctx.params
		const body = ctx.request.body
		try {
			ctx.validate(createRule, ctx.request.body)
			const status = await ctx.service.category.update(id, body)
			if (status === 'success') {
				ctx.helper.success()
			} else {
				ctx.helper.error(status)
			}
		} catch (e) {
			ctx.helper.error(e)
		}
	}

	async destroy() {
		const { ctx } = this
		try {
			const { id } = ctx.params
			const status = await ctx.service.category.destroy(id)
			if (status === 'success') {
				ctx.helper.success()
			} else {
				ctx.helper.error(status)
			}
		} catch (e) {
			ctx.helper.error(e)
		}
	}
}
module.exports = CategoryController
