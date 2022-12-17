Page({

  /**
   * 页面的初始数据
   */
  data: {
    //筛选参数组
    currentDate: null,
    placeArray: ['默认全校', '三江楼', '主A楼', '三山楼', '京江楼'],
    timeArray: ['所有时间', '一周内', '五天内', '三天内', '今天'],
    order: "ASC",
    //筛选用指针
    placeIndex: "0",
    timeIndex: "0",
    //滚动图和任务列表数据
    swiperItems: ['a', 'b', 'c', 'd'],
    missionlist: [],
    page:1,//当前页码
    pageSize:10,//每页数据条数
    total:0, //总数据条数
    //页面刷新项
    isloading: false
  },
  //处理排序
  orderHandler() {
    if (this.data.order === "ASC") {
      this.setData({
        order: "DESC" //降序
      })
      console.log(this.data.order)
    }
    else {
      this.setData({
        order: "ASC" //升序
      })
      console.log(this.data.order)
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
    console.log(e),
      this.setData({
        placeIndex: e.detail.value
      })
      wx.request({
        url: 'https://mock.apifox.cn/m1/1896460-0-default/categories/missionlist',
        method: 'GET',
        data:{
          place:this.data.placeArray[this.data.placeIndex],
          time:this.data.timeArray[this.data.timeIndex],
          order:this.data.order
        },
        success: (res) => {
          //数据
          console.log(res.data),
          //任务列表
          console.log(res.data.missionlist),
          //筛选结果
          console.log(this.data.placeArray[this.data.placeIndex],this.data.timeArray[this.data.timeIndex],this.data.order),
            this.setData({
              missionlist: [...this.data.missionlist, ...res.data.missionlist]
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
  //时间选择处理
  timeChangeHandler(e) {
    console.log(e),
      this.setData({
        timeIndex: e.detail.value
      })
  },
  //接受任务处理函数
  acceptMission(e) {
    // this.setData({
    //   missionIndex:e.currentTarget.id
    // })
    console.log(this.data.missionlist[e.currentTarget.id]["content"]),
      wx.showModal({
        title: '任务介绍',
        content: this.data.missionlist[e.currentTarget.id]["content"],
        confirmText: '接受',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定') //移除首页任务操作
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
  },
  //任务列表接口
  getMissionList(cb) {
    this.setData({
      isloading: true
    })
    wx.showLoading({
      title: 'Loading..(・ω'
    })
    wx.request({
      // url: 'https://mock.apifox.cn/m1/1896460-0-default/categories/missionlist1',
      url:'https://mock.apifox.cn/m1/1896460-0-default/categories/missionlist?apifoxApiId=49073707',
      method: 'GET',
      data:{
        //分页设置
        _page:this.data.page,
        _limit:this.data.pageSize,
        //筛选器传递的参数
        // place:this.data.placeArray[this.data.placeIndex],
        // timeRange:this.data.timeArray[this.data.timeIndex],
        // order:this.data.order
      },
      success: (res) => {
        console.log(res.data.length,res),
        console.log(this.data.placeArray[this.data.placeIndex],this.data.timeArray[this.data.timeIndex],this.data.order),
          this.setData({
            // missionlist: [...this.data.missionlist,...res.data.missionlist]
            missionlist: [...this.data.missionlist,...res.data]
          })
      },
      complete: () => {
        wx.hideLoading(),
          this.setData({
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
      page:1,
      missionlist:[],
      total:0
    })
    //传入一个回调函数，来执行停止下拉刷新函数
    this.getMissionList(()=>{
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if(this.data.page*this.data.pageSize>=this.data.total){
      return wx.showToast({
        title: '我是有底线的(ノдヽ)',
        icon:'none'
      })
    }
    if (!this.data.isloading) {
      this.setData({
        page:this.data.page + 1
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