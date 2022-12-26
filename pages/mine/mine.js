// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // AppID:'wx14f6e62edc057a02',
    // AppSecret:'a5155a9883a538a339eab2c4a1f58a2c',
    userName: '',
    balance: 0,
    menuitems: [
      { text: '任务清单', url: '/pages/mymissions/mymissions', icon: '/res/images/list.png'},
      { text: '任务审核', url: '/pages/review/review', icon: '/res/images/audit.png' },
    ]
  },
  //退出登录
  toLogout() {
    wx.clearStorageSync()
  },
  //登录功能函数
  //AppID(小程序ID):wx14f6e62edc057a02
  //AppSecret:a5155a9883a538a339eab2c4a1f58a2c
  toLoginPage() {
    wx.navigateTo({
      url: '/pages/login/login',
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

  //登录检测
  islogin() {
    ///////未登录跳转模块///////////
    let islogin = wx.getStorageSync('islogin')
    console.log(islogin)
    if (!islogin||islogin==null) {
      console.log("跳转至登录页")
      wx.navigateTo({ url: '/pages/login/login' })
      return
    }
    ////////////////////////////////
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    //////检查是否已经登录，未登录进行提醒///////
    let islogin = wx.getStorageSync('islogin')
    if (!islogin) {
      wx.showToast({
        title: '登录之后才能进行操作哦！',
        icon:'none'
      })
    }
    /////////////////////////////////////////////
    var userName = wx.getStorageSync('userName')
    this.setData({
      userName: userName
    })
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