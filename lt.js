// pages/CircleFriends/CircleFriends.js
var app = getApp()
var that

Page({
  /**
   * 页面的初始数据
   */
  data: {
	circle:[],
    DataSource: [1, 1, 1, 1, 1],
    icon: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3175633703,3855171020&fm=27&gp=0.jpg',
    content: '今天天气真好',
    resource: ['http://img2.imgtn.bdimg.com/it/u=2118739199,3378602431&fm=27&gp=0.jpg',
      'http://img0.imgtn.bdimg.com/it/u=2277942808,1417432970&fm=27&gp=0.jpg',
      'http://img5.imgtn.bdimg.com/it/u=1504812505,3480403568&fm=27&gp=0.jpg',
      'http://img4.imgtn.bdimg.com/it/u=3456219059,4251129897&fm=27&gp=0.jpg',
      'http://img3.imgtn.bdimg.com/it/u=3912316188,1981132393&fm=27&gp=0.jpg'
    ],
    zanSource: ['张三', '李四', '王五', '赵钱', '李俪', '王宝'],
    contnet: [{
        'firstname': '张三',
        'content': '好漂亮呀！！'
      },
      {
        'firstname': '李四',
        'content': '我也觉得！！'
	  }
    ],
    photoWidth: wx.getSystemInfoSync().windowWidth / 5,

    popTop: 0, //弹出点赞评论框的位置
    popWidth: 0, //弹出框宽度
	isShow: true, //判断是否显示弹出框
	buttonTop: 0,
    buttonLeft: 0,
    windowHeight: '',
    windowWidth: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
	var that =this;
	wx.cloud.callFunction({
		name:'circle',
		data:{
			type:'get'
		}
	}).then(res=>{
		console.log(res.result.data)
		this.setData({
			circle:res.result.data
		})
	}).catch(console.error)
    wx.getSystemInfo({
		success: function (res) {
		  console.log(res);
		  // 屏幕宽度、高度
		  console.log('height=' + res.windowHeight);
		  console.log('width=' + res.windowWidth);
		  // 高度,宽度 单位为px
		  that.setData({
			windowHeight:  res.windowHeight,
			windowWidth:  res.windowWidth,
			buttonTop:res.windowHeight*0.70,//这里定义按钮的初始位置
			buttonLeft:res.windowWidth*0.70,//这里定义按钮的初始位置
		  })
		}
	  })
  },
  // 点击图片进行大图查看
  LookPhoto: function(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.photurl,
      urls: this.data.resource,
    })
  },

  // 点击点赞的人
  TouchZanUser: function(e) {
    wx.showModal({
      title: e.currentTarget.dataset.name,
      showCancel: false
    })
  },

  f1:function(event){
	  wx.navigateTo({
		url: '/pages/index/index',
	  })
  }
})