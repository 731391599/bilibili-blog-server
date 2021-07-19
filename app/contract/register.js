module.exports = {
	registerRequest: {
		username: {
			type: 'string',
			require: true,
			description: '用户名',
			example: 'user1',
		},
		password: {
			type: 'string',
			require: true,
			description: '密码',
			example: '123456',
		},
		code: {
			type: 'string',
			require: true,
			description: '邀请码',
			example: '12345678',
		},
	},
}
