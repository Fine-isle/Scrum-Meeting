//index.js
//获取应用实例
var app = getApp()
const config = require('../../config')
const iconList = require('../../data/local-data')
var util = require('../../utils/util.js')

var pageNo = 0;
Page({
  data: {
    carrouselsAr: [], /** 轮播 */
    list: [],  /** 要闻列表 */
  },

  showDetail(e){
      var newsId = e.currentTarget.dataset.newsid;
      wx.navigateTo({
        url: '/pages/details/details?newsId=' + newsId,
      });
  },

  /** 跳转 */
  tapGridCell: function (event) {
    switch (event.currentTarget.dataset.iconId) {
      case 0:
        console.log("点击一张图")
        wx.navigateTo({
          url: '../map/map',
        })
        break
      case 1:
		console.log("点击村民树洞")
		wx.navigateTo({
		  url: '../question/question',
		})
        break
      case 2:
		console.log("点击维修")
		wx.navigateTo({
		  url: '../repair/repair',
		})
        break
      case 3:
		console.log("点击村委信息")
		wx.navigateTo({
			url: '../info/info',
		  })
    }
  },

  /** 跳转要闻详情页面 */
  tapHotNewsCell: function (event) {
    wx.navigateTo({
      url: 'HotNewsDetail/HotNewsDetail'
    })
  },

  /** 首页轮播请求 */
  requestAppinitData: function(){
    var that = this;
    let url = config.AppinitData

    var para = {
      "system": "02",
      "currentVersion": "3.1.81",
      "imei": "C75C7019-29FA-4F2B-8311-BAA6F29D1845",
      "model": "iPhone 5s (A1457\/A1518\/A1528\/A1530)",
      "systemVersion": "10.3.2",
      "accessToken": "",
      "sig": "",
      "scopeAddressCode": ""
    }

    wx.showLoading({ title: '加载中...' })
   
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    
    

  },

  /** 下拉刷新 */
  loadNewData: function () {
    pageNo = 1;
    this.requestData()

  },

  loadNewData_NextPage: function () {
    pageNo += 1;
    this.requestData();
  },

  requestData: function () {
    var that = this

    wx.request({
      url: config.GET_HOT_NEWS,
      data: {
        "system": "02",
        "tagId": "1",
        "accessToken": "",
        "scopeAddressCode": "",
        "key": "",
        "systemVersion": "10.3.1",
        "imei": "A902EA47-B1B2-452A-96FB-4C7BCCBB149C",
        "currentVersion": "3.1.6",
        "sig": "",
        "pageNo": pageNo,
        "model": "iPhone 6s Plus (A1699)",
        "pageSize": "20"
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'application/json' }, // 设置请求的 header
      success: function (res) {
        // success
        if (pageNo == 1) {
          that.setData({ list: res.data.data.list })
          
        }else {
          that.setData({ list: that.data.list.concat(res.data.data.list) })

        }

        console.log(that.data.list)
        
      },
      fail: function (res) {
        // fail
        pageNo--;
      },
      complete: function (res) {
        // complete
        wx.stopPullDownRefresh()
      }
    })

  },


  onLoad: function () {
    console.log('onLoad')
    /** 设置首页四图标 */
    console.log(iconList)
    this.setData(iconList)

    /** 请求首页轮播 */
    this.requestAppinitData();

    /** 请求要闻 */
    this.loadNewData();

    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
  },
  onSwiperTap: function (event) {
    // target 和currentTarget
    // target指的是当前点击的组件 和currentTarget 指的是事件捕获的组件
    // target这里指的是image，而currentTarget指的是swiper
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
    this.loadNewData();
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
    console.log("onReachBottom")
    
    this.loadNewData_NextPage()
  },


})
