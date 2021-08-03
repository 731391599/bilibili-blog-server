/* eslint valid-jsdoc: "off" */

'use strict'
const CryptoJS = require('crypto-js')
const path = require('path')
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
	/**
	 * built-in config
	 * @type {Egg.EggAppConfig}
	 **/
	const config = (exports = {})

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1626241013987_2283'

	// add your middleware config here
	// 中间件
	config.middleware = ['tokenHandler']
	// 配置tokenHandler
	config.tokenHandler = {
		match(ctx) {
			const url = ctx.request.url
			if (
				url.startsWith('/admin/captcha') ||
				url.startsWith('/admin/login') ||
				url.startsWith('/admin/register') ||
				url.startsWith('/favicon-32x32') ||
				url.startsWith('/swagger') ||
				url.startsWith('/api')
			) {
				return false
			} else {
				return true
			}
		}, // match 匹配
		// ignore // 忽略
	}

	// add your user config here
	const userConfig = {
		// myAppName: 'egg',
	}
	config.security = {
		csrf: {
			enable: false,
		},
	}
	// sequelize 开发
	// 手动创建一个
	config.sequelize = {
		dialect: 'mysql',
		host: '127.0.0.1',
		port: 3306,
		database: 'blog',
		username: 'root',
		password: '123456',
	}
	// 密钥
	config.KEY = CryptoJS.enc.Utf8.parse('1dsajio123890sdasdfx') // 20位
	config.IV = CryptoJS.enc.Utf8.parse('sadf098123jiosda')
	// token密钥
	config.jwt = {
		secret: 'fd123fldasiodifo123',
	}

	// swagger
	config.swaggerdoc = {
		dirScanner: './app/controller',
		apiInfo: {
			title: 'NinJa-blog',
			description: 'NinJa-blog',
			version: '1.0.0',
		},
		schemes: ['http', 'https'],
		consumes: ['application/json'],
		produces: ['application/json'],
		enableSecurity: false,
		// enableValidate: true,
		routerMap: false,
		enable: true,
	}

	// 静态文件
	config.static = {
		prefix: '/public',
		dir: path.join(appInfo.baseDir, 'app/public'),
		dynamic: true, // 如果当前访问的静态资源没有缓存，则缓存静态文件
		preload: false,
		maxAge: 30000000,
		buffer: true,
	}

	return {
		...config,
		...userConfig,
	}
}
