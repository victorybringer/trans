const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
openid:[],
check:[],
time:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://mercifuldruid.cn/trans/loadmanagehistory?user=' + app.globalData.user,

      success(res) {
        var data = res.data.trim().split("\n")
        var openid=[]
        var qualified=[]
        var time=[]
        wx.hideLoading()


        for(var i=0;i<data.length;++i){
          openid.push(data[i].split(",")[0])
          qualified.push(data[i].split(",")[1])
          time.push(data[i].split(",")[2])
        }

        that.setData({
          openid: openid,
          check: qualified,
          time:time
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
  his:function(e){

app.globalData.currentcaruser=this.data.openid[e.target.id]
wx.navigateTo({
  url: '../managehistoryinterface/managehistoryinterface',
})
    
  }
})