'use strict'
const Service = require('egg').Service

class UserInfoService extends Service {
	constructor(ctx) {
		super(ctx)
	}
	async update(id, body) {
		try {
			await this.ctx.model.UserInfo.update(
				{ ...body },
				{
					where: { userId: id },
				}
			)
			return 'success'
		} catch (e) {
			return JSON.stringify(e)
		}
	}
	async show(id) {
		const { ctx } = this
		try {
			const data = await ctx.model.UserInfo.findOne({
				include: [
					{
						model: ctx.model.Role,
					},
				],
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
			console.log(e)
			body.status = '服务端错误'
		}
	}
}
module.exports = UserInfoService
