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
 

qualfied:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
    var that = this
 
        wx.request({
          url: 'https://mercifuldruid.cn/trans/loadstate?openid=' + app.globalData.currentcaruser,

          success(res) {
            var data = res.data.trim().split("\n")
            wx.hideLoading()

            that.setData({
              id: data[2],
              name: data[1],
              carnumber: data[3],
              image1: data[4],
              image2: data[5],
             
              qualified: data[0].trim(),
              pdf: data[6]
            })
        



          }
        })

      },
  
  
 
 

open:function(){
  var that=this
  wx.downloadFile({
    // 示例 url，并非真实存在
    url: that.data.pdf,

    success: function (res) {
      const filePath = res.tempFilePath
      wx.hideLoading()
      wx.openDocument({
        filePath: filePath,
        success: function (res) {
          console.log('打开文档成功')
        }
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