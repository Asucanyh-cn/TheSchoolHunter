// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginStatus: false,
  },
  //登录操作
  toLogin(e) {
    var that=this
    console.log(e)
    if (e.detail.value.username == null || e.detail.value.password == null) {
      wx.showToast({
        title: '账号或密码不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      if (e.detail.value.username == "testuser" && e.detail.value.password=="a") {
        var userName = e.detail.value.username;
        var unitId = e.detail.value.id;
        wx.setStorageSync('unitId', unitId);
        wx.setStorageSync('userName', userName);
        wx.switchTab({
          url: '../mine/mine'
        })
      } 
      else {
        wx.showToast({
          title: "请检查账号或密码！",
          icon: 'none',
          duration: 2000
        })
      }
      //发起网络请求，判断用户存在、密码是否正确
      /*const that = this
      wx.request({
        url: 'url',
        method: "POST",
        data: {
          username: e.detail.value.username,
          password: e.detail.value.password,
        },
        success(res) {
          if (res.data.code == "OK") {
            var unitName = res.data.data.User.unitName;
            var unitId = res.data.data.User.unitId;
            wx.setStorageSync('unitId', unitId);
            wx.setStorageSync('userName', username);
            wx.switchTab({
              url: '../login/login'
            })
          } 
          else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
          }
        }
      })*/
    }
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