const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
checkid:'',
state:'0',
result:'',
time:'',
index:0,
length:0,
image:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var index = app.globalData.currentid
    
this.setData({
index:index,
  state: app.globalData.currentstate,
  checkid: app.globalData.checkid[index],
  result: app.globalData.result[index],
  time: app.globalData.time[index],
  length: app.globalData.result.length-1,
  image: app.globalData.photo[index],
})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})