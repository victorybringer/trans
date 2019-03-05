const app=getApp()
var QRCode = require('../../utils/weapp-qrcode.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) 
  
  
  
  {
    wx.showLoading({
      title: '请等待',
    })
    var qrcode = new QRCode('canvas', {
      // usingIn: this,
      text: app.globalData.openid,
      width: 150,
      height: 150,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
    var that=this
    wx.request({
      url: 'https://mercifuldruid.cn/trans/loadstate?openid=' + app.globalData.openid,

      success(res) {
        wx.hideLoading()
     
     that.setData({

state:res.data.trim().split("\n")[0] ,      
   
    
     })
   
        if (res.data.trim().split("\n")[0]==1){

wx.switchTab({

  url: '../trip/trip',
})
}





      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  again:function(){
    wx.request({
      url: 'https://mercifuldruid.cn/trans/delete?openid=' + app.globalData.openid,

      success(res) {
      
      wx.redirectTo({
        url: '../index/index',
      })
      
      }
    })

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