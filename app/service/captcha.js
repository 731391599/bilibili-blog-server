const Service = require('egg').Service
const svgCaptcha = require('svg-captcha')

class CaptchaService extends Service {
	constructor(ctx) {
		super(ctx)
	}

	async index() {
		// 这些参数可以根据前端传递参数改变
		const captcha = svgCaptcha.create({
			size: 4,
			fontSize: 50,
			ignoreChars: 'IiOo1', // 禁用
			width: 100,
			height: 40,
			noise: 3,
			color: true,
			background: '#FFF',
		})
		// 将其存入session 用来验证
		this.ctx.session.code = captcha.text.toLowerCase()
		// 调试验证码
		console.log(this.ctx.session.code)
		// 设置时效
		this.ctx.session.maxAge = 1000 * 60 * 10
		return captcha
	}
}

module.exports = CaptchaService
