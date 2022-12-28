// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin: false,
  },
  //登录操作
  toLogin(e) {
    var that = this
    if (e.detail.value.username == null || e.detail.value.password == null) {
      wx.showToast({
        title: '账号或密码不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      ///////////////////////////////测试用账号/////////////////////////////////////
      // if (e.detail.value.username == "testuser" && e.detail.value.password=="a") {
      //   var userName = e.detail.value.username;
      //   var unitId = e.detail.value.id;
      //   wx.setStorageSync('islogin', "true");
      //   wx.setStorageSync('userName', userName);
      //   wx.switchTab({
      //     url: '../mine/mine'
      //   })
      // } 
      // else {
      //   wx.showToast({
      //     title: "请检查账号或密码！",
      //     icon: 'none',
      //     duration: 2000
      //   })
      // }
      ///////////////////////////////////////////////////////////////////////
      //发起网络请求，判断用户存在、密码是否正确
      const that = this
      wx.request({
        url: 'https://tshapi.wantz.zone/api/login',
        method: "GET",
        data: {
          username: e.detail.value.username,
          password: e.detail.value.password,
        },
        success(res) {
          // console.log(JSON.parse('{"code":1, "message":"success", "data":{"balance": 5.0, "identity":"普通用户"}}').code)
          console.log(res.data)
          // if (JSON.parse('{"code":1, "message":"success", "data":{"balance": 5.0, "identity":"普通用户"}}').code == "1") {
          if (res.data.code == "1") {
            var userName = e.detail.value.username
            var userID = res.data.data.userID
            var userRole = res.data.data.identity
            var balance = res.data.data.balance
            wx.setStorageSync('islogin', "true")
            wx.setStorageSync('userName', userName)
            wx.setStorageSync('userID', userID)
            wx.setStorageSync('userRole', userRole)
            wx.setStorageSync('balance', balance)
            wx.switchTab({
              url: '../mine/mine'
            })
          }
          else {
            wx.showToast({
              // title: res.data.message,
              title:"用户不存在！",
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
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