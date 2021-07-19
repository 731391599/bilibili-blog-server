const Service = require('egg').Service

class RegisterService extends Service {
	constructor(ctx) {
		super(ctx)
	}

	async index(body) {
		const { ctx } = this
		// 获取前端参数
		const { username, password, code } = body
		const hasCode = await ctx.model.Code.findOne({
			where: {
				status: 0,
				code,
			},
		})
		// 如果为null 验证码无效 被使用过或不存在
		// 尝试下相同用户名
		if (hasCode) {
			// 判断是否有同名用户 用户名是唯一的
			const hasSameUser = await ctx.model.User.findOne({
				where: {
					username,
				},
			})
			if (!hasSameUser) {
				// 注册逻辑
				// 将明文密码直接存入数据库不安全 需要使用对称加密
				const pwd = this.ctx.helper.encrypt(password)
				const { id } = await ctx.model.User.create({
					username,
					password: pwd,
					code,
				})

				// 自动注册userInfo
				await ctx.model.UserInfo.create({
					userId: id,
					name: username,
				})
				// 注册成功后 将邀请码设置为已使用
				await ctx.model.Code.update(
					{ status: 1 },
					{
						where: {
							id: hasCode.id,
						},
					}
				)
				return 'success'
			} else {
				return '存在相同用户'
			}
		} else {
			return '验证码无效'
		}
	}
}

module.exports = RegisterService
