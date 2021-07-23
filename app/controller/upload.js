'use strict'

const { Controller } = require('egg')
const pump = require('mz-modules/pump')
const path = require('path')
const fs = require('fs')
/**
 * @Controller Upload
 */
class UploadController extends Controller {
	/**
	 * @description 图片上传
	 * @Router post /admin/upload/img
	 * @Request formData file blogImg
	 */
	async uploadImg() {
		const { ctx } = this
		const stream = await this.ctx.getFileStream()
		const key = stream.filename // 文件标识
		if (key !== 'blogImg') {
			ctx.helper.error('无效的标识')
		}
		try {
			const filename = Date.now() + encodeURIComponent(stream.filename)
			// 写入的路径
			const target = path.join('app/public', filename)
			// 写入文件
			const writeStream = fs.createWriteStream(target)
			await pump(stream, writeStream)
			ctx.helper.success({
				filename,
				url: `/public/${filename}`,
			})
		} catch (e) {
			console.log(e)
			ctx.helper.error('上传失败')
		}
	}
}

module.exports = UploadController
