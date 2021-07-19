'use strict'

const Controller = require('egg').Controller
/**
 * @Controller UserInfo
 */
class UserInfoController extends Controller {
	/**
	 * @description 用户详情
	 * @Router get /admin/userInfo/{id}
	 * @Request path string *id
	 */
	async show() {
		const { ctx } = this
		const { id } = ctx.params
		try {
			const body = await ctx.service.userInfo.show(id)
			if (body.status === 'success') {
				ctx.helper.success(body.data)
			} else {
				ctx.helper.error(body.data)
			}
		} catch (e) {
			ctx.helper.error(e)
		}
	}
}

module.exports = UserInfoController
