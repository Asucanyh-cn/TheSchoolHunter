// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:false
  },
  toRegister(e){
    console.log(e)
    var usrn=e.detail.value.username
    var p1=e.detail.value.password1
    var p2=e.detail.value.password2
    this.check(usrn,p1,p2)
    if(this.data.flag){
      console.log("Register success!")
    }
  },
  check(usrn,p1,p2)
  {
    if(p1==''||p2==''||usrn==''){
      wx.showToast({
        title: '账号密码不能为空！',
        icon:'none'
      })
    }
    else if(p1!=p2){
      wx.showToast({
        title: '密码不一致！',
        icon:'none'
      })
    }
    else{
      this.setData({
        flag:true
      })
    }
    //后端检查用户是否已注册
    wx.request({
      url: '',
      data:{
        username:usrn
      },
      success(res){
        //返回1表示存在
        if(res.data.code==1){
          wx.showToast({
            title: '账号已存在！',
            icon:'none'
          })
          this.setData({
            flag:false
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})