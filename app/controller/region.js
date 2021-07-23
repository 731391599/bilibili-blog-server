'use strict'
const Controller = require('egg').Controller
/**
 * @Controller 地区
 */
class RegionController extends Controller {
	/**
	 * @description 省
	 * @Router get /admin/province
	 */
	async province() {
		const { ctx } = this
		try {
			const data = await ctx.service.region.province()
			ctx.helper.success(data)
		} catch (e) {
			console.log(e)
			ctx.helper.error(JSON.stringify(e))
		}
	}

	/**
	 * @description 市
	 * @Router get /admin/city/{id}
	 * @Request path string *id
	 */
	async city() {
		const { ctx } = this
		try {
			const { id } = ctx.params
			const data = await ctx.service.region.city(id)
			ctx.helper.success(data)
		} catch (e) {
			console.log(e)
			ctx.helper.error(JSON.stringify(e))
		}
	}

    /**
	 * @description 区
	 * @Router get /admin/area/{id}
	 * @Request path string *id
	 */
	async area() {
		const { ctx } = this
		try {
			const { id } = ctx.params
			const data = await ctx.service.region.area(id)
			ctx.helper.success(data)
		} catch (e) {
			console.log(e)
			ctx.helper.error(JSON.stringify(e))
		}
	}
}

module.exports = RegionController
