// pages/mymissions/mymissions.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    acceptedMissions: [],
    postingMissions: [],
    currentData: 0,
    page:1,
    limit:5,
    username:'',
  },
  //已接受的任务
  checkMyMissions(e){
    let that=this
    let title=that.data.acceptedMissions[e.currentTarget.id]["title"]
    let content=that.data.acceptedMissions[e.currentTarget.id]["content"]
    console.log()
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      complete: (res) => {
        if (res.cancel) {
          
        }
    
        if (res.confirm) {
          
        }
      }
    })
  },
  //发布中的任务
  cancelorConfirm(e){
    let that=this
    let missionId=that.data.postingMissions[e.currentTarget.id]['id']
    wx.showModal({
      title: '任务评分',
      content: '请你对任务完成情况进行客观打分，这将影响其积分收入！',
      confirmText:'开始打分',
      complete: (res) => {
        if (res.cancel) {
          //用户点击取消
        }
        if (res.confirm) {
          let scoreList=['5','4','3','2','1']
          wx.showActionSheet({
            itemList: scoreList,
            success (res) {
              //传递评分用于处理积分
              let rank=scoreList[res.tapIndex]
              console.log(missionId,scoreList[res.tapIndex])
              //移除发布中的任务（结束任务）
              wx.request({
                url: 'https://tshapi.wantz.zone/api/finishMission',
                method:'GET',
                data:{
                  missionId:missionId,
                  rank:rank,
                }
              })
            },
            fail (res) {
              console.log(res.errMsg)
            }
          })
        }
      }
    })
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
      method: 'GET',
      data: {
        username: that.data.username,
        page: that.data.page,
        limit: that.data.limit,
      },
      success(res) {
        console.log(res)
        that.setData({
          acceptedMissions: [...that.data.acceptedMissions, ...res.data.data.acceptedMissions.mission],
          postingMissions:[...that.data.postingMissions,...res.data.data.postingMissions.mission]
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