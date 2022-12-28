Page({

  /**
   * 页面的初始数据
   */
  data: {
    //筛选参数组
    currentDate: '',
    placeArray: ['全部', '三江楼', '主A楼', '三山楼', '京江楼'],
    timeArray: ['所有时间', '一周内', '五天内', '三天内', '今天'],
    orderType: 'mdate',
    order: "asc",
    //筛选用指针
    placeIndex: "0",
    timeIndex: "0",
    //滚动图和任务列表数据
    swiperItems: [
      { url: 'https://i.328888.xyz/2022/12/20/AWgaL.jpeg' },
      { url: 'https://i.328888.xyz/2022/12/20/AWXzk.jpeg' },
      { url: 'https://i.328888.xyz/2022/12/20/AW70p.jpeg' },
      { url: 'https://i.328888.xyz/2022/12/20/AWEXU.jpeg' }],
    missionlist: [],
    page: 1,//当前页码
    limit: 5,//每页数据条数
    total: 0, //总数据条数
    //页面刷新项
    isloading: false
  },
  //处理排序
  orderTypeHandler() {
    if (this.data.orderType === "mdate") {
      this.setData({
        orderType: "rewards"
      })
    }
    else {
      this.setData({
        orderType: "mdate"
      })
    }
  },
  //  根据日期排序
  sortByDateDesc: function (array, property) {
    return array.sort(function (a, b) {
      var value1 = Date.parse(new Date(a[property]));  //转换成十六进制获取日期
      var value2 = Date.parse(new Date(b[property]));
      return value2 - value1; //value1-value2是从小到大排序 反过来则是从大到小的排序
    })
  },
  sortByDateAsc: function (array, property) {
    return array.sort(function (a, b) {
      var value1 = Date.parse(new Date(a[property]));  //转换成十六进制获取日期
      var value2 = Date.parse(new Date(b[property]));
      return value1 - value2; //value1-value2是从小到大排序 反过来则是从大到小的排序
    })
  },
  //对数组的某个属性进行排序
  sortByRewardsDesc: function (array, property) {
    return array.sort(function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value2 - value1;
    })
  },
  sortByRewardsAsc: function (array, property) {
    return array.sort(function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
    })
  },
  //按类型排序
  orderHandler() {
    var orderType = this.data.orderType
    if (this.data.order === "asc") {
      this.setData({
        order: "desc",//降序
      })
      if (orderType == 'rewards') {
        this.setData({
          missionlist: this.sortByRewardsDesc(this.data.missionlist, orderType)
        })
      } else {
        this.setData({
          missionlist: this.sortByDateDesc(this.data.missionlist, orderType)
        })
      }
    }
    else {
      this.setData({
        order: "asc",//升序
      })
      if (orderType == 'rewards') {
        this.setData({
          missionlist: this.sortByRewardsAsc(this.data.missionlist, orderType)
        })
      } else {
        this.setData({
          missionlist: this.sortByDateAsc(this.data.missionlist, orderType)
        })
      }
    }
  },
  //获取当前时间
  getCurrentTime() {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年  
    var Y = date.getFullYear();
    //获取月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //还有时分秒
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    console.log("当前日期：" + Y + '年' + M + '月' + D + '日' + hour + '时' + minute + '分' + second + '秒');
    this.setData({
      currentDate: Y + '-' + M + '-' + D
    })
  },
  //地点选择处理
  placeChangeHandler(e) {
    const that = this
    console.log("地点选择处理：", e),
      that.setData({
        placeIndex: e.detail.value
      })
    that.onPullDownRefresh()
  },
  //时间选择处理
  timeChangeHandler(e) {
    const that = this
    console.log("时间选择处理", e),
      that.setData({
        timeIndex: e.detail.value
      })
    that.onPullDownRefresh()
  },
  //接受任务处理函数
  acceptMission(e) {
    const that = this
    let username = wx.getStorageSync('userName')
    let missionId=that.data.missionlist[e.currentTarget.id]["id"]
    ///////未登录跳转模块///////////
    let islogin = wx.getStorageSync('islogin')
    // console.log(islogin)
    if (!islogin) {
      console.log("跳转至登录页")
      wx.navigateTo({ url: '/pages/login/login' })
      return
    }
    ///////////////////////////////
    console.log("任务ID与用户userName：", missionId, username)
    wx.showModal({
      title: '任务介绍',
      content: that.data.missionlist[e.currentTarget.id]["content"],
      confirmText: '接受',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: 'https://tshapi.wantz.zone/api/receiveMission',
            method: 'GET',
            data: {
              missionId: missionId,
              username: username
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
  //任务列表接口
  getMissionList(cb) {
    const that = this
    that.setData({
      isloading: true
    })
    wx.showLoading({
      title: 'Loading..(・ω'
    })
    //
    var timeSelected=that.data.timeArray[that.data.timeIndex]
    if(timeSelected==="一周内"){
      timeSelected='oneWeek'
    }
    else if(timeSelected==="五天内"){
      timeSelected='fiveDays'
    }
    else if(timeSelected==="三天内"){
      timeSelected='threeDays'
    }
    else if(timeSelected==="今天"){
      timeSelected='today'
    }
    else if(timeSelected==="所有时间"){
      timeSelected='all'
    }
    wx.request({
      url: 'https://tshapi.wantz.zone/api/getMissionList',
      method: 'GET',
      data: {
        page: that.data.page,
        limit: that.data.limit,
        timeRange: timeSelected,
      },
      success(res) {
        that.setData({
          missionlist: [...that.data.missionlist, ...res.data.data.mission],
          total:res.header["x-total-count"]
        })
        console.log(that.data.page,that.data.total)
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getMissionList(),
      this.getCurrentTime()
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
    
    //重置为第一页的数据
    this.setData({
      page: 1,
      missionlist: [],
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
    if(this.data.page*this.data.limit>this.data.total){
      return wx.showToast({
        title: '我是有底线的(ノдヽ)',
        icon:'none'
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