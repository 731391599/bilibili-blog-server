'use strict'
const { Controller } = require('egg')

const createRule = {
	path: {
		type: 'string',
	}, // 路径
	menuName: 'string',
	icon: {
		type: 'string',
		required: false,
	},
	component: {
		type: 'string',
		required: false,
	},
	pid: {
		type: 'number',
		required: false,
	},
	roleLevel: {
		type: 'array',
		required: false,
	},
	redirect: {
		type: 'string',
		required: false,
	},
}

class MenuController extends Controller {
	async create() {
		const { ctx } = this
		try {
			ctx.validate(createRule, ctx.request.body)
			const status = await ctx.service.menu.create(ctx.request.body)
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
			const body = await ctx.service.menu.index()
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
			const status = await ctx.service.menu.update(id, body)
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
			const status = await ctx.service.menu.destroy(id)
			if (status === 'success') {
				ctx.helper.success()
			} else {
				ctx.helper.error(status)
			}
		} catch (e) {
			ctx.helper.error(e)
		}
	}

	async route() {
		const { ctx } = this
		try {
			const { username } = ctx.decode // token解析用户名
			const data = await ctx.service.menu.route(username)
			ctx.helper.success(data)
		} catch (e) {
			ctx.helper.error(e)
		}
	}
}
module.exports = MenuController
