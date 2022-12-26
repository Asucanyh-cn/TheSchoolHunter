// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
 
  },
  toRegister(e){
    // console.log(e)
    const that=this
    var usrn=e.detail.value.username
    var p1=e.detail.value.password1
    var p2=e.detail.value.password2
    this.check(usrn,p1,p2)
  },
  check(usrn,p1,p2){
    const that=this
    if(p1==''||p2==''||usrn==''){
      wx.showToast({
        title: '账号密码不能为空！',
        icon:'none'
      })
      return
    }
    else if(p1!=p2){
      wx.showToast({
        title: '密码不一致！',
        icon:'none'
      })
      return
    }
    //后端检查用户是否已注册
    wx.request({
      url: 'https://tshapi.wantz.zone/api/register',
      method:'GET',
      data:{
        username:usrn,
        password:p1,
      },
      success(res){
        console.log(res.data)
        console.log(res.data.code)
        //返回12表示存在
        if(res.data.code==12){
          wx.showToast({
            title: '账号已存在！',
            icon:'none'
          })
        }else{
            wx.navigateTo({
              url: '/pages/login/login',
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