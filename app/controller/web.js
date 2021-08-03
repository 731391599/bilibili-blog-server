'use strict'
const { Controller } = require('egg')

class WebController extends Controller {
	// 文章
	async homeArticle() {
		const { ctx } = this
		try {
			const body = await ctx.service.web.homeArticle()
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
}

module.exports = WebController
