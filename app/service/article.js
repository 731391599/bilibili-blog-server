'use strict'
const { Service } = require('egg')

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
		const data = await this.ctx.model.Article.findAndCountAll(options)
		return data
	}
	async all(username, query) {
		const { pageSize, pageNum } = query
		const offset = (pageNum - 1) * pageSize
		const options = {
			limit: pageSize * 1,
			offset,
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
		const data = await this.ctx.model.Article.findAndCountAll(options)
		body.status = 'success'
		body.data = data
		return body
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

	async publish(id, body) {
		const { ctx } = this
		try {
			if (body.status) {
				body.status = 4

				const { status } = await ctx.model.Article.findOne({
					where: {
						id,
					},
				})
				if (status === 2) {
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
			}
			return '文章状态错误'
		} catch (e) {
			console.log(e)
		}
	}
}

module.exports = ArticleService
