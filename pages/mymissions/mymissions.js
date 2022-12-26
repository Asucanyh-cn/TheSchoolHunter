// pages/mymissions/mymissions.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    acceptedMissions: [],
    postingMissions: [],
    currentData: 0,
    username:'',
  },
  //获取任务列表
  getMissionList(cb) {
    const that = this
    that.setData({
      isloading: true
    })
    wx.showLoading({
      title: 'Loading..(・ω'
    })
    wx.request({
      url: 'https://tshapi.wantz.zone/api/getMyMission',
      method: 'POST',
      data: {
        //分页设置
        page: that.data.page,
        limit: that.data.pageSize,
        username: that.data.username,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        that.setData({
          // acceptedMissions: [...that.data.acceptedMissions, ...res.data.data.acceptedMissions],
          // postingMissions:[...that.data.postingMissions,...res.data.data.postingMissions]
        })
      },
      complete: () => {
        wx.hideLoading(),
          that.setData({
            isloading: false
          })
        //cb()回调函数。执行在使用方法时用箭头函数传入的函数参数
        cb && cb()
      }
    })
  },
  //处理“已接受任务”项目
  finishedOrCancel(e) {
    const that = this
    let username = wx.getStorageSync('userName')
    ///////未登录跳转模块///////////
    let islogin = wx.getStorageSync('islogin')
    // console.log(islogin)
    if (!islogin) {
      console.log("跳转至登录页")
      wx.navigateTo({ url: '/pages/login/login' })
      return
    }
    ////////////////////////////////
    console.log("任务ID与用户userName：", this.data.missionlist[e.currentTarget.id]["id"], username)
    wx.showModal({
      title: '任务介绍',
      content: this.data.acceptedMissions[e.currentTarget.id]["content"],
      confirmText: '完成任务',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: 'https://tshapi.wantz.zone/api/delMission',
            method: 'GET',
            data: {
              id: that.data.acceptedMissions[e.currentTarget.id]["id"],
              username: that.data.username
            },
            success(res) {
              console.log(res)
              //成功接收后刷新列表
              that.onPullDownRefresh()
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    ///////未登录跳转模块///////////
    let islogin = wx.getStorageSync('islogin')
    let username = wx.getStorageSync('userName')
    console.log(islogin,username)
    if (!islogin || islogin == null) {
      console.log("跳转至登录页")
      wx.navigateTo({ url: '/pages/login/login' })
      return
    }
    ////////////////////////////////
    //获取当前用户已接受的任务列表和发布中的任务
    this.setData({
      username:username
    })
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
    //重置为第一页的数据
    this.setData({
      page: 1,
      acceptedMissions: [],
      postingMissions:[],
      total: 0
    })
    //传入一个回调函数，来执行停止下拉刷新函数
    this.getMissionList(() => {
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.page * this.data.pageSize >= this.data.total) {
      return wx.showToast({
        title: '我是有底线的(ノдヽ)',
        icon: 'none'
      })
    }
    if (!this.data.isloading) {
      this.setData({
        page: this.data.page + 1
      })
      this.getMissionList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})