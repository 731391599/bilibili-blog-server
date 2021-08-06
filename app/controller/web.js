'use strict'
const { Controller } = require('egg')

const indexRule = {
	pageNum: 'number',
}

class WebController extends Controller {
	// 文章
	async homeArticle() {
		const { ctx } = this
		try {
			ctx.validate(indexRule, ctx.request.body)
			const body = await ctx.service.web.homeArticle(ctx.request.body)
			if (body.status === 'success') {
				ctx.helper.success(body.data)
			} else {
				ctx.helper.error(body.status)
			}
		} catch (e) {
			ctx.helper.error(e)
		}
	}
	// 用户
	async homeUser() {
		const { ctx } = this
		try {
			const body = await ctx.service.web.homeUser()
			if (body.status === 'success') {
				ctx.helper.success(body.data)
			} else {
				ctx.helper.error(body.status)
			}
		} catch (e) {
			ctx.helper.error(e)
		}
	}
	// 分类
	async homeCategory() {
		const { ctx } = this
		try {
			const body = await ctx.service.web.homeCategory()
			if (body.status === 'success') {
				ctx.helper.success(body.data)
			} else {
				ctx.helper.error(body.status)
			}
		} catch (e) {
			ctx.helper.error(e)
		}
	}
    // 根据分类查找
	async article() {
		const { ctx } = this
		try {
			const { id } = ctx.params
			ctx.validate(indexRule, ctx.request.body)
			const body = await ctx.service.web.article(id, ctx.request.body)
			if (body.status === 'success') {
				ctx.helper.success(body.data)
			} else {
				ctx.helper.error(body.status)
			}
		} catch (e) {
			ctx.helper.error(e)
		}
	}
    // 根据用户查找
    async userArticle() {
		const { ctx } = this
		try {
			const { id } = ctx.params
			ctx.validate(indexRule, ctx.request.body)
			const body = await ctx.service.web.userArticle(id, ctx.request.body)
			if (body.status === 'success') {
				ctx.helper.success(body.data)
			} else {
				ctx.helper.error(body.status)
			}
		} catch (e) {
			ctx.helper.error(e)
		}
	}
}

module.exports = WebController
