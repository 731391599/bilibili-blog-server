module.exports = {
	loginRequest: {
		username: {
			type: 'string',
			require: true,
			description: '用户名',
			example: 'user',
		},
		password: {
			type: 'string',
			require: true,
			description: '密码',
			example: '123456',
		},
		captcha: {
			type: 'string',
			require: true,
			description: '验证码',
			example: '1234',
		},
	},
}
