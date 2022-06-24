const db = wx.cloud.database({
  env:'cloud1-8geo8ke32606ca18'
})
const question=db.collection('question')
Page({
    data: {
      
    },
    onSumbit:function(event){
      console.log(event.detail.value);
      if (event.detail.value.question.replace(/\s+/g, '') == '') {
        wx.showToast({
          title: '请填写留言内容',
          icon: 'loading',
          duration: 1500
        })
        return;
      }
      if (event.detail.value.question.length > 500) {
        wx.showToast({
          title: '留言内容太长',
          icon: 'loading',
          duration: 1500
        })
        return;
      }
      if (event.detail.value.tel.length == 0) {
        wx.showToast({
          title: '请填写电话号码',
          icon: 'loading',
          duration: 1500
        })
        return;
      }
      question.add({
        data:{
          question:event.detail.value.question,
          tel:event.detail.value.tel
        }
      }).then(res=>{
        console.log(res),
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1800
        })
      })

    },
    handleBack(){
      wx.navigateTo({
        url: '../question/question',
      })
  }
  
  })
  