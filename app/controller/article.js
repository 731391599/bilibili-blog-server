'use strict'
const { Controller } = require('egg')

const createRule = {
	title: {
		type: 'string',
	}, // 标题
	cover: {
		type: 'string',
	}, // 配图
	content: {
		type: 'string',
	}, // 内容
	categoryId: 'number', // 分类ID
	status: {
		type: 'boolean',
		required: false,
	},
}
const statusRule = {
	status: 'boolean', // 审核通过 审核拒绝
}

const indexRule = {
	pageSize: 'string',
	pageNum: 'string',
	// 查询标题 模糊查询
	keywords: {
		type: 'string',
		required: false,
	},
	queryStatus: {
		type: 'string',
		required: false,
	},
	queryCategoryId: {
		type: 'string',
		required: false,
	},
}
const allRule = {
	pageSize: 'string',
	pageNum: 'string',
	// 查询标题 模糊查询
	keywords: {
		type: 'string',
		required: false,
	},
	queryStatus: {
		type: 'string',
		required: false,
	},
	queryCategoryId: {
		type: 'string',
		required: false,
	},
	queryUsername: {
		type: 'string',
		required: false,
	},
}

class ArticleController extends Controller {
	async index() {
		const { ctx } = this
		try {
			const { username } = ctx.decode
			ctx.validate(indexRule, ctx.request.query)
			const data = await ctx.service.article.index(
				username,
				ctx.request.query
			)
			ctx.helper.success(data)
		} catch (e) {
			ctx.helper.error(e)
		}
	}

	async create() {
		const { ctx } = this
		try {
			ctx.validate(createRule, ctx.request.body)
			// 获取用户名并查询id 可以封装成中间件处理
			const { username } = ctx.decode
			const status = await ctx.service.article.create(
				username,
				ctx.request.body
			)
			if (status === 'success') {
				ctx.helper.success()
			} else {
				ctx.helper.error(status)
			}
		} catch (e) {
			ctx.helper.error(e)
		}
	}

	async show() {
		const { ctx } = this
		const { id } = ctx.params
		try {
			const body = await ctx.service.article.show(id)
			if (body.status === 'success') {
				ctx.helper.success(body.data)
			} else {
				ctx.helper.error(body.data)
			}
		} catch (e) {
			ctx.helper.error(e)
		}
	}

	async update() {
		const { ctx } = this
		try {
			const { id } = ctx.params
			ctx.validate(createRule, ctx.request.body)
			const status = await ctx.service.article.update(
				id,
				ctx.request.body
			)
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
			const status = await ctx.service.article.destroy(id)
			if (status === 'success') {
				ctx.helper.success()
			} else {
				ctx.helper.error(status)
			}
		} catch (e) {
			ctx.helper.error(e)
		}
	}

	// 管理员审核
	async audit() {
		const { ctx } = this
		try {
			ctx.validate(statusRule, ctx.request.body)
			const { id } = ctx.params
			// 获取用户名并查询id 可以封装成中间件处理
			const { username } = ctx.decode
			const status = await ctx.service.article.audit(
				username,
				id,
				ctx.request.body
			)
			if (status === 'success') {
				ctx.helper.success()
			} else {
				ctx.helper.error(status)
			}
		} catch (e) {
			ctx.helper.error(e)
		}
	}
	// 用户去审核
	async toAudit() {
		const { ctx } = this
		try {
			ctx.validate(statusRule, ctx.request.body)
			const { id } = ctx.params
			const status = await ctx.service.article.toAudit(
				id,
				ctx.request.body
			)
			if (status === 'success') {
				ctx.helper.success()
			} else {
				ctx.helper.error(status)
			}
		} catch (e) {
			ctx.helper.error(e)
		}
	}
	// 用户审核通过后发布
	async publish() {
		const { ctx } = this
		try {
			ctx.validate(statusRule, ctx.request.body)
			const { id } = ctx.params
			const status = await ctx.service.article.publish(
				id,
				ctx.request.body
			)
			if (status === 'success') {
				ctx.helper.success()
			} else {
				ctx.helper.error(status)
			}
		} catch (e) {
			ctx.helper.error(e)
		}
	}

	// 管理员
	async all() {
		const { ctx } = this
		try {
			const { username } = ctx.decode
			ctx.validate(allRule, ctx.request.query)
			const body = await ctx.service.article.all(
				username,
				ctx.request.query
			)
			if (body.status === 'success') {
				ctx.helper.success(body.data)
			} else {
				ctx.helper.error(body.status)
			}
		} catch (e) {
			ctx.helper.error(e)
		}
	}

	async showHome() {
		const { ctx } = this
		try {
			ctx.validate(statusRule, ctx.request.body)
			const { id } = ctx.params
			const status = await ctx.service.article.showHome(
				id,
				ctx.request.body
			)
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

module.exports = ArticleController
