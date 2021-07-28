'use strict'
const { Service } = require('egg')
const sequelize = require('sequelize')
class UserService extends Service {
	constructor(ctx) {
		super(ctx)
	}

	async index(query) {
		const { pageSize, pageNum } = query
		const offset = (pageNum - 1) * pageSize
		const options = {
			attributes: { exclude: ['password'] },
			limit: pageSize * 1,
			offset,
		}
		if (query.key) {
			options.where = {
				[query.key]: {
					[sequelize.Op.like]: `%${query.keywords}%`,
				},
			}
		}
		const data = await this.ctx.model.User.findAndCountAll(options)
		return data
	}

	async show(id) {
		const { ctx } = this
		try {
			const data = await ctx.model.User.findOne({
				attributes: { exclude: ['password'] },
				where: {
					id,
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

	async create(body) {
		const { ctx } = this
		// 获取前端参数
		const { username, password } = body

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
				code: '00000000',
			})

			// 自动注册userInfo
			await ctx.model.UserInfo.create({
				userId: id,
				name: username,
			})
			return 'success'
		} else {
			return '存在相同用户'
		}
	}

	async update(id, body) {
		try {
			if (body.password) {
				body.password = this.ctx.helper.encrypt(body.password)
			} else {
				delete body.password
			}
			await this.ctx.model.User.update({ ...body }, { where: { id } })
			return 'success'
		} catch (e) {
			return '服务端错误'
		}
	}

	async destroy(id) {
		try {
			const data = await this.ctx.model.User.destroy({
				where: { id },
			})
			if (data == 0) {
				return '该数据不存在'
			}
			return 'success'
		} catch (e) {
			return '服务端错误'
		}
	}
}

module.exports = UserService
