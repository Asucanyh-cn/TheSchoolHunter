// pages/review/review.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    missionlist: [],
    userId:0,
    page:1,
    limit:5,
    //页面刷新项
    isloading: false
  },
  reviewMission(e) {
    wx.showModal({
      title: '任务介绍',
      content: this.data.missionlist[e.currentTarget.id]["content"],
      confirmText: '通过',
      cancelText: '打回',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定') //添加至任务首页
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  getMissionList(cb) {
    this.setData({
      isloading: true
    })
    wx.showLoading({
      title: 'Loading..(・ω'
    })
    wx.request({
      // url: 'https://mock.apifox.cn/m1/1896460-0-default/categories/missionlist1',
      // url: 'https://mock.apifox.cn/m1/1896460-0-default/categories/missionlist?apifoxApiId=49073707',
      url:'https://tshapi.wantz.zone/api/getAuditMission',
      method: 'GET',
      data: {
        userId:this.data.userId,
        page:this.data.page,
        limit:this.data.limit
      },
      success: (res) => {
        console.log(res.data.length, res),
          this.setData({
            // missionlist: [...this.data.missionlist,...res.data.missionlist]
            missionlist: [...this.data.missionlist, ...res.data.data.mission]
          })
      },
      complete: () => {
        wx.hideLoading(),
          this.setData({
            isloading: false
          })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    ///////未登录跳转模块///////////
    let islogin = wx.getStorageSync('islogin')
    console.log(islogin)
    if (!islogin || islogin == null) {
      console.log("跳转至登录页")
      wx.navigateTo({ url: '/pages/login/login' })
      return
    }
    ////////////////////////////////  
    this.getMissionList()
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