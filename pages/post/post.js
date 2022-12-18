const app = getApp()
Page({
  data: {
    mdate: '请选择截至时间！',
    placesArr: ['请选择任务地点！','三江楼', '主A楼', '三山楼'],
    placeIndex: 0,
    num: 1,
    minusStatus: 'disable',
    tempFilePath: '',
    count: 1,
  },
  //发布任务 上传至服务器 任务数据表
  postMission(e){
    var auditStatus=0
    console.log(e)

  },
  //选择图片上传功能
  uploadPic() {
    const that=this
    //选择图片
    wx.chooseMedia({
      count: this.data.count,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      camera: 'back',
      success(res) {
        console.log("选择文件成功，文件临时路径为：", res.tempFiles[0].tempFilePath)
        that.setData({
          tempFilePath: res.tempFiles[0].tempFilePath
        }),
        wx.uploadFile({
          filePath: that.data.tempFilePath,
          url: 'https://sm.ms/api/v2/upload',
          name: 'smfile',
          success: res => {
            //逆向转换JSON字符串后抽取网址
            console.log("图片上传成功！")
            console.log(JSON.parse(res.data).data.url)
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