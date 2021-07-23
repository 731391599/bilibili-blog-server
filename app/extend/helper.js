// 封装公用方法
const CryptoJS = require('crypto-js')
module.exports = {
	// 处理200
	success(data) {
		const body = {
			success: true,
		}
		if (data) {
			body.data = data
		}
		this.ctx.status = 200
		this.ctx.body = body
	},
	// 处理错误
	error(error, status) {
		this.ctx.status = status || 403
		this.ctx.body = {
			success: false,
			data: JSON.stringify(error),
		}
	},
	// 加密
	encrypt(word, keyStr, ivStr) {
		let key = this.config.KEY
		let iv = this.config.IV
		if (keyStr) {
			key = CryptoJS.enc.Utf8.parse(keyStr)
			iv = CryptoJS.enc.Utf8.parse(ivStr)
		}
		let srcs = CryptoJS.enc.Utf8.parse(word)
		var encrypted = CryptoJS.AES.encrypt(srcs, key, {
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.ZeroPadding,
		})
		return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
	},
	// 解密
	decrypt(word, keyStr, ivStr) {
		let key = this.config.KEY
		let iv = this.config.IV

		if (keyStr) {
			key = CryptoJS.enc.Utf8.parse(keyStr)
			iv = CryptoJS.enc.Utf8.parse(ivStr)
		}

		let base64 = CryptoJS.enc.Base64.parse(word)
		let src = CryptoJS.enc.Base64.stringify(base64)

		let decrypt = CryptoJS.AES.decrypt(src, key, {
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.ZeroPadding,
		})

		let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
		return decryptedStr.toString()
	},

	// 生成token
	setToken(opt) {
		return this.app.jwt.sign(opt, this.app.config.jwt.secret, {
			expiresIn: '7d', // 设置时效 后面会该短 根据请求更新时效
		})
	},
}
