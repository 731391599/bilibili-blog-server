'use strict'

const Controller = require('egg').Controller
const rule = {
	username: 'string',
	password: 'string',
	code: 'string',
}
/**
 * @Controller Register
 */
class RegisterController extends Controller {
	/**
	 * @description 注册
	 * @Router post /admin/register
	 * @Request body registerRequest
	 */
	async index() {
		const { ctx } = this
		try {
			// 参数校验
			ctx.validate(rule, ctx.request.body)
			// service处理数据 连接mysql
			const status = await ctx.service.register.index(ctx.request.body)
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

module.exports = RegisterController
