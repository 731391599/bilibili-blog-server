'use strict'
const { Service } = require('egg')

class MenuService extends Service {
	constructor(ctx) {
		super(ctx)
	}

	async create(body) {
		const { ctx } = this
		try {
			if (body.roleLevel) {
				body.roleLevel = JSON.stringify(body.roleLevel)
			}
			await ctx.model.Menu.create({
				...body,
			})
			return 'success'
		} catch (e) {
			console.log(e)
			return '服务端错误'
		}
	}

	async index() {
		const { ctx } = this
		try {
			const data = await ctx.model.Menu.findAll({
				raw: true,
			})
			// 将扁平结构转为树形结构
			const newData = ctx.helper.toTree(data)
			return {
				status: 'success',
				data: newData,
			}
		} catch (e) {
			return {
				status: '服务端错误',
			}
		}
	}

	async update(id, body) {
		const { ctx } = this
		try {
			if (body.roleLevel) {
				body.roleLevel = JSON.stringify(body.roleLevel)
			}
			await ctx.model.Menu.update(
				{ ...body },
				{
					where: { id },
				}
			)
			return 'success'
		} catch (e) {
			return '服务端错误'
		}
	}

	async destroy(id) {
		try {
			const data = await this.ctx.model.Menu.destroy({
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

	async route(username) {
		// 查询user的详情
		const { ctx } = this
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
		const role = user.user_info.roleId

		// 获取菜单 进行过滤

		let menus = await ctx.model.Menu.findAll({
			raw: true,
		})

		menus = menus.filter(menu => JSON.parse(menu.roleLevel).includes(role))
		const newMenus = ctx.helper.toTree(menus)
		return newMenus
	}
}

module.exports = MenuService
