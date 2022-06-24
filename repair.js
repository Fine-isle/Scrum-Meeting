Page({
	data: {
		list: [{
			id: 1,
			name: '东村荔枝路222号 芒果',
			content: "我家空调又又又又坏了！请师傅有空的话快来上门维修！联系电话1323135434",
			state: 0,
		}, {
			id: 2,
			name: '西村织女路 荔枝',
			content: "我家电视机不显示！请师傅有空的话尽快上门维修！今天上午一上午都在家，下午可能会去田里，请打电话13231331323",
			state: 0,
		}, {
			id: 3,
			name: '东村仙女路 苹果',
			content: "我的电脑一不小心进水了！蹲一位精通电脑的师傅过来修理",
			state: 1,
		}]
	},

	click: function (e) {
		console.log("按了：", e.currentTarget.id)
		var i = e.currentTarget.id
		var lists = this.data.list
		if (lists[i].state == 1) {
			wx.navigateTo({
			  url: '../repair-details/repair-details',
			})
		} else {
			lists[i].state = 1

			this.setData({
				list: lists
			})
		}

	}

})