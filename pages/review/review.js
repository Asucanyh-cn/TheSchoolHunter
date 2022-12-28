// pages/review/review.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    missionlist: [],
    page:1,
    limit:5,
    isloading: false,
    // username:'',
    // miss,
    
  },
  reviewMission(e) {
    let that=this
    let username=wx.getStorageSync('userName')
    let missionId=that.data.missionlist[e.currentTarget.id]["id"]
    let status=''
    wx.showModal({
      title: '任务介绍',
      content: this.data.missionlist[e.currentTarget.id]["content"],
      confirmText: '通过',
      cancelText: '打回',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定') //添加至任务首页
          status='已通过'
        } else if (res.cancel) {
          console.log('用户点击取消')
          status='未通过'
        }
        wx.request({
          url: 'https://tshapi.wantz.zone/api/auditMission',
          method:'GET',
          data:{
            username:username,
            missionId:missionId,
            status:status
          },
          success(res){
            console.log(res.data,status)
            that.onPullDownRefresh()
          }
        })
      }
    })
  },
  getMissionList(cb) {
    let username=wx.getStorageSync('userName')
    this.setData({
      isloading: true
    })
    wx.showLoading({
      title: 'Loading..(・ω'
    })
    wx.request({
      url:'https://tshapi.wantz.zone/api/getAuditMission',
      method: 'GET',
      data: {
        username:username,
        page:this.data.page,
        limit:this.data.limit
      },
      success: (res) => {
        console.log(res.data.data),
          this.setData({
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
    this.setData({
      missionlist:[]
    })
    this.getMissionList()
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