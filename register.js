
var app=getApp()
Page({
  data:{
    user: null,
    employee: '',
    username: '',
    password: ''
  },
  onLoad:function(options){
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  updateEmpid: function(e){
    this.setData({
      employee: e.detail.value
    })
  },
  updatePassword: function(e){
    this.setData({
      password: e.detail.value
    })
  },
  save: function(){

    var username = this.data.employee;
    var password = this.data.password;
	wx.cloud.callFunction({
		name:"user",
		data:{
			type:"login",
			username:username,
			password:password
		}
	}).then(res=>{
		console.log(res.result)
		if(res.result.data.length!=0){
			app.globalData.userInfo=res.result.data[0];
			console.log(app.globalData.userInfo)
			wx.switchTab({
			  url: '../main/main',
			})
		  }
	}).catch(console.error) 
  }
})