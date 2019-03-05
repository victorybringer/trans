const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: 'JSB0001',
    pass: '111'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  userNameInput: function (e) {

    this.setData({


      user: e.detail.value


    })





  },




  passWdInput: function (e) {

    this.setData({

      pass: e.detail.value


    })


  },

  click: function () {
    var that = this;
    wx.showLoading({
      title: '请等待',
    })
    wx.request({
      url: 'https://mercifuldruid.cn/trans/log2?User=' + that.data.user + '&Password=' + that.data.pass,

      success(res) {
        app.globalData.user = that.data.user
     
        wx.hideLoading()
        if (res.data == true && that.data.user.substring(3,2)=='B'){
        wx.navigateTo({
          url: '../manage/manage',
        })


      }
        if (res.data == true && that.data.user.substring(3, 2) == 'C') {
          wx.navigateTo({
            url: '../check/check',
          })


        }
        if (res.data == false ){
        wx.showToast({
          title: '用户名或密码错误',
          icon: 'none'


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