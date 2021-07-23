module.exports = {
	updateUserInfo: {
		name: {
			type: 'string',
			require: false,
			description: '昵称',
			example: 'user1',
		},
		avatar: {
			type: 'string',
			require: false,
			description: '头像',
			example: 'http://xxxx.jpg',
		},
		mobile: {
			type: 'string',
			require: false,
			description: '手机号',
			example: '13888888888',
		},
		provinceId: {
			type: 'number',
			require: false,
			description: '省ID',
			example: 111,
		},
		cityId: {
			type: 'number',
			require: false,
			description: '市ID',
			example: 222,
		},
		areaId: {
			type: 'number',
			require: false,
			description: '区ID',
			example: 333,
		},
	},
}
