'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
	async index() {
		const { ctx } = this
		// ctx.helper.success('成功')
		// ctx.helper.error('错误', 401)
		// ctx.helper.success(ctx.helper.encrypt(123))
		// 6hv5ENZC/sjZyRIolbq77w== 加密后
		// 解密
		// 测试一下
		ctx.helper.success()
	}
}

module.exports = HomeController
