const app = getApp()
Page({
  data: {
    loginflag: true,
    draftflag: false,
    mdate: '请选择截至时间！',
    placesArr: ['请选择任务地点！', '三江楼', '主A楼', '三山楼'],
    placeIndex: 0,
    num: 1,
    minusStatus: 'disable',
    tempFilePath: '',
    count: 1,
    picUrl: '',
  },
  //发布任务 上传至服务器 任务数据表
  postMission(e) {
    var auditStatus = 0
    const that = this
    console.log(e)
    //草稿
    if (e.detail.target.id == "type1") {
      wx.showToast({
        title: '草稿已保存，重新进入小程序将会丢失！',
        icon: 'none'
      })
      //保存在本地
      wx.setStorageSync('title', e.detail.value.title)
      wx.setStorageSync('content', e.detail.value.content)
      wx.setStorageSync('points', e.detail.value.points)
      wx.setStorageSync('endTime', that.data.mdate)
      wx.setStorageSync('place', that.data.placesArr[that.data.placeIndex])
      wx.setStorageSync('picUrl', that.data.picUrl)
      wx.setStorageSync('type', 1)
      wx.setStorageSync('auditStatus', 0)
    } else {
      ///////未登录跳转模块///////////
      let islogin = wx.getStorageSync('islogin')
      let username = wx.getStorageSync('userName')
      console.log(islogin)
      if (!islogin || islogin == null) {
        console.log("跳转至登录页")
        wx.navigateTo({ url: '/pages/login/login' })
        return
      }
      ////////////////////////////////
      console.log("正在发布任务")
      wx.showToast({
        title: '任务已发布，请等待审核通过！',
        icon: 'none'
      })
      //发布任务
      //标记为待审核。
      wx.request({
        url: 'https://tshapi.wantz.zone/api/addMission',
        method: 'GET',
        data: {
          title: e.detail.value.title,
          content: e.detail.value.content,
          rewards: e.detail.value.points,
          mdate: that.data.mdate,
          mplace: that.data.placesArr[that.data.placeIndex],
          icon: that.data.picUrl,
          // type: 0,
          auditStatus: 0,
          username:username,
        },
        success(res) {
          console.log("发布任务成功返回值：",res,"日期：", that.data.mdate)
        }
      })
    }
  },
  //选择图片上传功能
  uploadPic() {
    const that = this
    //选择图片
    wx.chooseMedia({
      count: this.data.count,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      camera: 'back',
      success(res) {
        wx.showToast({
          title: '正在上传图片，请稍等！..6s',
          icon: 'none',
          duration:6000,
        })
        console.log("选择文件成功，文件临时路径为：", res.tempFiles[0].tempFilePath)
        that.setData({
          tempFilePath: res.tempFiles[0].tempFilePath
        }),
          wx.uploadFile({
            filePath: that.data.tempFilePath,
            url: 'https://tshapi.wantz.zone/api/upload',
            name: 'smfile',
            success: res => {
              console.log("图片上传成功！")
              //逆向转换JSON字符串后抽取网址
              that.setData({
                picUrl: JSON.parse(res.data).url
              })
              console.log('图片的在线链接：', that.data.picUrl)
              if (that.data.picUrl != null) {
                wx.showToast({
                  title: '上传图片完毕！',
                  icon: 'none'
                })
              }
            },
          })
      }
    })
    //上传图片

  },
  //设置截止时间
  bindDateChange(e) {
    this.setData({
      mdate: e.detail.value
    })
  },
  //设置任务地点
  bindPlaceChange: function (e) {
    this.setData({
      placeIndex: e.detail.value
    })
  },
  //悬赏金额设置
  /*点击减号*/
  bindMinus: function () {
    var num = this.data.num;
    if (num > 1) {
      num--;
    }
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus
    })
  },
  /*点击加号*/
  bindPlus: function () {
    var num = this.data.num;
    num++;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus
    })
  },
  /*输入框事件*/
  bindManual: function (e) {
    var num = e.detail.value;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus
    })
  },
  showToast() {
    wx.showToast({
      title: '我是标题哦',
      icon: 'success',
      duration: 20000
    })
    //wx.hideToast()
  },
  /**
   * 页面的初始数据
   */
  loadingStart() {
    this.setData({
      loading: true
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
    //保存在本地
    if (this.data.draftflag) {
      this.setData({
        title: wx.getStorageSync('title'),
        content: wx.setStorageSync('content'),
        points: wx.setStorageSync('points'),
        endTime: wx.setStorageSync('endTime'),
        place: wx.setStorageSync('place'),
        picUrl: wx.setStorageSync('picUrl'),
        type: wx.setStorageSync('type'),
        auditStatus: wx.setStorageSync('auditStatus'),
      })
    }
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
        icon: 'none'
      })
    }
    /////////////////////////////////////////////
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