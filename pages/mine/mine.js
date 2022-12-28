// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // AppID:'wx14f6e62edc057a02',
    // AppSecret:'a5155a9883a538a339eab2c4a1f58a2c',
    userName: '',
    userRole:'',
    balance: 0,
    menuitems: [
      { text: '任务清单', url: '/pages/mymissions/mymissions', icon: '/res/images/list.png'}
    ]
  },
  //同步金额
  updateBalance(){
    let balance=wx.getStorageSync('balance')
    let that=this
    that.setData({
      balance:balance
    })
    return
  },
  //退出登录
  toLogout() {
    wx.clearStorageSync()
  },
  toLoginPage() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.updateBalance()
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
    var userRole = wx.getStorageSync('userRole')
    this.setData({
      userName: userName,
      userRole: userRole
    })
    console.log(this.data.userName,this.data.userRole)
    this.updateBalance()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    this.updateBalance()
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
    this.updateBalance()
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