const Service = require('egg').Service

class LoginService extends Service {
	constructor(ctx) {
		super(ctx)
	}
	async index(body) {
		// 解构参数
		const { username, password, captcha } = body
		// 从session中取出验证码
		const { code } = this.ctx.session
		const data = {}
		if (code === captcha) {
			// 验证账号密码是否匹配
			const pwd = this.ctx.helper.encrypt(password)
			const user = await this.ctx.model.User.findOne({
				where: {
					username,
					password: pwd,
				},
			})
			if (!user) {
				return '用户名或密码错误'
			}
			// 判断用户的禁用状态
			if (user.status === 0) {
				return '用户已被禁用，请联系管理员'
			}
			data.status = 'success'
			data.data = {
				id: user.id,
			}
			return data
		}
		return '验证码错误'
	}
}

module.exports = LoginService
