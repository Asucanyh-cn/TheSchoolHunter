const app = getApp()
Page({
  data: {
    mdate:'2022-11-9',
    placesArr:['三江楼','主A楼','三山楼'],
    placeIndex:0,
    num:1,
   minusStatus:'disable'
  },
  //设置截止时间
  bindDateChange(e){
    this.setData({
      date:e.detail.value
    })
  },
//设置任务地点
bindPlaceChange:function(e){
  this.setData({
    placeIndex:e.detail.value
  })
},
//悬赏金额设置
  /*点击减号*/
  bindMinus: function() {
    var num = this.data.num;
    if (num>1) {
      num--;
    }
    var minusStatus = num>1 ? 'normal':'disable';
    this.setData({
      num:num,
      minusStatus:minusStatus
    })
  },
  /*点击加号*/
  bindPlus: function() {
    var num = this.data.num;
    num++;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num:num,
      minusStatus: minusStatus
    })
  },
  /*输入框事件*/
  bindManual: function(e) {
    var num = e.detail.value;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num:num,
      minusStatus: minusStatus
    })
  },
  showToast(){
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
  loadingStart(){
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