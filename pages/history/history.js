const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
id:[],
time:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://mercifuldruid.cn/trans/loadhistory?openid=' + app.globalData.openid,

      success(res) {
        var data = res.data.trim().split("\n")
        var time=[]
        var id=[]
        wx.hideLoading()


        for(var i=0;i<data.length;++i){
time.push(data[i].split(",")[1])
          id.push(data[i].split(",")[0])
        }

        that.setData({
       time:time,
       id:id
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
    wx.request({
      url: 'https://mercifuldruid.cn/trans/loadfunction?openid=' + app.globalData.openid,


      success(res) {
        var data = res.data.trim().split("\n")
        app.globalData.current = data[1]
        app.globalData.currentstate = data[0].trim()
       

      }
    })
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
app.globalData.current=this.data.id[e.target.id]

wx.navigateTo({
  url: '../maphistory/maphistory',
})
    
  }
})