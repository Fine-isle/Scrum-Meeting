// miniprogram/pages/post/post.js
var util = require('../../utils/util.js');
const app = getApp()
Page({
	data: {
		text: "",
		images: []
	},

	inputText(e) {
		this.setData({
			text: e.detail.value
		})
		console.log(this.data.text)
	},
	chooseImg() {
		var that = this;
		wx.chooseImage({
			count: 9,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success(res) {
				var tempFilePaths = res.tempFilePaths
				that.setData({
					images: tempFilePaths
				})
				console.log('images', that.data.images)
			}
		})
	},
	canceImg(e) {
		var src = this.data.images
		var index = e.currentTarget.dataset.index
		console.log(index)
		src.splice(index, 1)
		this.setData({
			images: src
		})
	},

	submit() {
		var that = this
		var src = that.data.images
		const upload = src.map((file) => this.uploadFile(file))
		Promise.all(upload).then(data => {
			console.log('云存储返回数据', data)
			const newFileList = data.map(item => (item.fileID))
			console.log('处理云存储返回数据', newFileList)
			src = newFileList
			wx.cloud.callFunction({
				name: 'circle',
				data: {
					type: 'add',
					content: that.data.text,
					time: that.getNewTime(),
					image: src,
					avatarUrl: that.data.avatarUrl,
					name: that.data.name
				}
			}).then(res => {
				console.log(res)
			}).catch(console.error)
			wx.redirectTo({
			  url: '../lt/lt',
			})
		})
	},
	getNewTime() {
		const nT = new Date(); //获取时间戳
		const n = nT.getFullYear(); //获取年份
		const y = nT.getMonth() + 1; // 获取月份（从0开始，要加1）
		const r = nT.getDate(); //获取天数
		const h = nT.getHours(); //获取小时
		const m = nT.getMinutes(); //获取分钟
		const s = nT.getSeconds(); //获取秒
		return n + "-" + y + "-" + r + " " + h + ":" + m + ":" + s; 
	  },
	uploadFile(url) {
		let suffix = /\.\w+$/.exec(url)[0]
		var filename = new Date().getTime + '-' + Math.floor(Math.random() * 100000) + "" + suffix
		return wx.cloud.uploadFile({
			cloudPath: 'circle/' + filename,
			filePath: url
		})
	},
	onReady: function () {},
	/*生命周期函数--监听页面加载*/
	onLoad: function (options) {

	},
	/*** 生命周期函数--监听页面初次渲染完成 */
	onReady: function () {

	},
	/** 生命周期函数--监听页面显示*/
	onShow: function () {

	},
})