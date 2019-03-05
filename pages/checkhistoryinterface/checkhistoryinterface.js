const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    id:'',
   
    carnumber:'',
    image1:'',
    image2:'',
    image3: '',
    text:'',
    latitude: '',
    longitude: '',
    
 



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
   var that=this
   
    wx.request({
      url: 'https://mercifuldruid.cn/trans/loadstate3?id=' + app.globalData.currentcaruser + '&checkid=' + app.globalData.user,

      success(res) {
        var data = res.data.trim().split("\n")
        wx.hideLoading()

        that.setData({
          id: data[3],
          name: data[2],
          carnumber: data[4],
          image1: data[5],
          image2: data[6],
          image3: data[0],
          result:data[8]
         
        })




      }

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

  },


})