'use strict'
const { Service } = require('egg')
const sequelize = require('sequelize')

class WebService extends Service {
	constructor(ctx) {
		super(ctx)
	}

	async homeArticle() {
		const { ctx } = this
		try {
			const data = await ctx.model.Article.findAll({
				include: [
					{
						model: ctx.model.UserInfo,
					},
					{
						model: ctx.model.Category,
					},
				],
				where: {
					showHome: 1,
				},
				order: [['createdAt', 'DESC']],
				limit: 6,
			})
			return {
				status: 'success',
				data: data,
			}
		} catch (e) {
			console.log(e)
			return {
				status: '服务端错误',
			}
		}
	}

	async homeUser() {
		const { ctx } = this
		try {
			// 1.找到所有文章
			// 2.通过文章分组
			// 3.通过userId 去找到userInfo 头像、昵称等
			// 4.通过count去排序 ** 创建的字段 需要用literal去找
			// 5.增加限制字段 只显示前5
			const data = await ctx.model.Article.findAll({
				include: [
					{
						model: ctx.model.UserInfo,
					},
				],
				attributes: [
					'userId',
					[
						sequelize.fn('COUNT', sequelize.col('article.user_id')),
						'count',
					],
				],
				order: [[sequelize.literal('count'), 'DESC']],
				group: 'userId',
				limit: 5,
			})
			return {
				status: 'success',
				data: data,
			}
		} catch (e) {
			console.log(e)
			return {
				status: '服务端错误',
			}
		}
	}

	async homeCategory() {
		const { ctx } = this
		try {
			const data = await ctx.model.Category.findAll()
			return {
				status: 'success',
				data: data,
			}
		} catch (e) {
			return {
				status: '服务端错误',
			}
		}
	}
}
module.exports = WebService
