'use strict'
const Service = require('egg').Service

class UserInfoService extends Service {
	constructor(ctx) {
		super(ctx)
	}
	async show(id) {
		const { ctx } = this
		try {
			const data = await ctx.model.UserInfo.findOne({
				where: {
					userId: id,
				},
			})
			const body = {
				data,
			}
			if (!data) {
				body.status = '暂无此用户'
			} else {
				body.status = 'success'
			}
			return body
		} catch (e) {
			body.status = '服务端错误'
		}
	}
}
module.exports = UserInfoService
