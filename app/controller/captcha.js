const Controller = require('egg').Controller
'use strict'
/**
 * @Controller Captcha
 */
class CaptchaController extends Controller {
	/**
	 * @description 验证码
	 * @Router get /admin/captcha
	 */
	async index() {
		const { ctx } = this
		const captcha = await ctx.service.captcha.index()
		ctx.response.type = 'image/svg+xml'
		ctx.helper.success(captcha.data)
	}
}

module.exports = CaptchaController
