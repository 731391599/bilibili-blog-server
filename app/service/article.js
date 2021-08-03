'use strict'
const { Service } = require('egg')
const sequelize = require('sequelize')

class ArticleService extends Service {
	constructor(ctx) {
		super(ctx)
	}
	async index(username, query) {
		const { pageSize, pageNum } = query
		const offset = (pageNum - 1) * pageSize
		const { id } = await this.ctx.model.User.findOne({
			where: {
				username,
			},
		})

		const options = {
			limit: pageSize * 1,
			offset,
			where: {
				userId: id,
			},
		}
		if (query.keywords) {
			options.where.title = {
				[sequelize.Op.like]: `%${query.keywords}%`,
			}
		}
		if (query.queryStatus) {
			options.where.status = query.queryStatus
		}
		if (query.queryCategoryId) {
			options.where.categoryId = query.queryCategoryId
		}
		const data = await this.ctx.model.Article.findAndCountAll(options)
		return data
	}

	async create(username, body) {
		const { ctx } = this
		try {
			// 1. 获取用户的id
			const { id } = await ctx.model.User.findOne({
				where: {
					username,
				},
			})
			// 2. 整合数据 存入文章表
			if (body.status) {
				body.status = 1
			} else {
				body.status = 0
			}
			await ctx.model.Article.create({
				...body,
				userId: id,
			})
			return 'success'
		} catch (e) {
			console.log(e)
		}
	}

	async show(id) {
		const { ctx } = this
		try {
			const data = await ctx.model.Article.findOne({
				include: [
					{
						model: ctx.model.User,
						include: [
							{
								model: ctx.model.UserInfo,
							},
						],
						attributes: { exclude: ['password'] },
					},
					{
						model: ctx.model.Category,
					},
				],
				where: {
					id,
				},
			})
			const body = {
				data,
				status: 'success',
			}
			return body
		} catch (e) {
			body.status = '服务端错误'
		}
	}

	async update(id, body) {
		try {
			if (body.status) {
				body.status = 1
			} else {
				body.status = 0
			}
			await this.ctx.model.Article.update({ ...body }, { where: { id } })
			return 'success'
		} catch (e) {
			return '服务端错误'
		}
	}

	async destroy(id) {
		try {
			const data = await this.ctx.model.Article.destroy({
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

	async audit(username, id, body) {
		const { ctx } = this
		try {
			// 1. 获取用户的id
			const user = await ctx.model.User.findOne({
				include: [
					{
						model: ctx.model.UserInfo,
					},
				],
				where: {
					username,
				},
			})
			if (user.user_info.roleId < 3) {
				return '权限不足'
			}
			// 查询文章是否为待审核状态
			const article = await ctx.model.Article.findOne({
				where: {
					id,
					status: 1,
				},
			})
			if (article) {
				// 2. 整合数据 存入文章表
				if (body.status) {
					body.status = 2
				} else {
					body.status = 3
				}
				await ctx.model.Article.update(
					{ ...body },
					{
						where: {
							id,
						},
					}
				)
				return 'success'
			} else {
				return '文章状态错误'
			}
		} catch (e) {
			console.log(e)
		}
	}
	async toAudit(id, body) {
		const { ctx } = this
		try {
			if (body.status) {
				body.status = 1
			} else {
				body.status = 0
			}

			const { status } = await ctx.model.Article.findOne({
				where: {
					id,
				},
			})
			if (status === 1 || status === 0) {
				await ctx.model.Article.update(
					{ ...body },
					{
						where: {
							id,
						},
					}
				)
				return 'success'
			} else {
				return '文章状态错误'
			}
		} catch (e) {
			console.log(e)
		}
	}

	async publish(id, body) {
		const { ctx } = this
		try {
			if (body.status) {
				body.status = 4
			} else {
				body.status = 0
			}

			const { status } = await ctx.model.Article.findOne({
				where: {
					id,
				},
			})
			if (status === 2 || status === 4) {
				await ctx.model.Article.update(
					{ ...body },
					{
						where: {
							id,
						},
					}
				)
				return 'success'
			} else {
				return '文章状态错误'
			}
		} catch (e) {
			console.log(e)
		}
	}

	async all(username, query) {
		const { pageSize, pageNum } = query
		const offset = (pageNum - 1) * pageSize
		const options = {
			limit: pageSize * 1,
			offset,
			where: {},
		}

		const user = await this.ctx.model.User.findOne({
			include: [
				{
					model: this.ctx.model.UserInfo,
				},
			],
			where: {
				username,
			},
		})
		const body = {}
		if (user.user_info.roleId < 3) {
			body.status = '权限不足'
			return body
		}
		let searchId = ''
		if (query.key === 'name') {
			try {
				const user = await this.ctx.model.UserInfo.findOne({
					where: {
						name: {
							[sequelize.Op.like]: `%${query.keywords}%`,
						},
					},
				})
				if (user) {
					searchId = user.userId
				}
			} catch (e) {
				console.log(e)
			}
		}
		if (query.key === 'title') {
			options.where.title = {
				[sequelize.Op.like]: `%${query.keywords}%`,
			}
		}

		if (query.queryStatus) {
			options.where.status = query.queryStatus
		}

		if (query.queryCategoryId) {
			options.where.categoryId = query.queryCategoryId
		}

		if (searchId) {
			options.where.userId = searchId
		}

		try {
			const data = await this.ctx.model.Article.findAndCountAll(options)
			body.status = 'success'
			body.data = data
			return body
		} catch (e) {
			console.log(e)
		}
	}

	async showHome(id, body) {
		const { ctx } = this
		try {
			if (body.status) {
				body.showHome = 1
			} else {
				body.showHome = 0
			}

			delete body.status
			const { status } = await ctx.model.Article.findOne({
				where: {
					id,
				},
			})
			if (status === 4) {
				await ctx.model.Article.update(
					{ ...body },
					{
						where: {
							id,
						},
					}
				)
				return 'success'
			}
			return '文章状态错误'
		} catch (e) {
			console.log(e)
		}
	}
}

module.exports = ArticleService
