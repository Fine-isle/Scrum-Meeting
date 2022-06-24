// pages/question/question.js
const db = wx.cloud.database({
  //这个是环境ID,不是环境名称
  env: 'cloud1-8geo8ke32606ca18'
})
const question = db.collection("question")
const solve = db.collection("solve")
Page({
    /**
     * 页面的初始数据
     */
  
    data: {
      question:[],
      solve:[],
            indicatorDots: true,
            autoplay: true,
            interval: 3000,
            duration: 1000,
                // 页面配置  
                winWidth: 0, 
                winHeight: 0, 
                // tab切换
                currentTab: 0,
      },
     
          //swiper制作tab切换
          // 滑动切换tab 
        bindChange: function( e ) { 
              var that = this; 
              that.setData( { currentTab: e.detail.current }); 
        }, 
       // 点击tab切换 
          changeItem: function( e ) { 
            var that = this; 
            if( this.data.currentTab === e.target.dataset.current ) { 
            return false; 
            }else{ 
            that.setData( { 
              currentTab: e.target.dataset.current 
            }) 
            } 
          },
     

          
        openAddPage : function (){
        wx.navigateTo({
          url: '../feedback/feedback',
        })
    },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
        var that = this;

        question.get().then(res=>{
          console.log(res.data)

          this.setData({
            question: res.data
          })
        }),

        solve.get().then(res=>{
            console.log(res.data)
  
            this.setData({
              solve: res.data
            })
          }),

     
        // 获取系统信息
        wx.getSystemInfo({
          success: function (res) {
              that.setData({
              winWidth: res.windowWidth,
              winHeight: res.windowHeight
            });
          }
        });

        
      },

    })