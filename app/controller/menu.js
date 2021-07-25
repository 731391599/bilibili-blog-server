'use strict'
const { Controller } = require('egg')

const createRule = {
	path: {
		type: 'string',
	}, // 路径
	menuName: 'string',
	icon: {
		type: 'string',
	},
	component: {
		type: 'string',
	},
	pid: {
		type: 'number',
		required: false,
	},
	roleLevel: {
		type: 'array',
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
}
module.exports = MenuController
