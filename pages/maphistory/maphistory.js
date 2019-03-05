
const app=getApp();



Page({



  data: {
    latitude: '',
    longitude: '',
    markers:[],
    polyline: [],

   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
 
    var that = this
   

    
      
      
      var markers=[]



      wx.request({
        url: 'https://mercifuldruid.cn/trans/loadprocess?id=' + app.globalData.current,


        success(res) {

          var data=res.data.trim().split("\n")
          var result=[]
          var checkid=[]
          var photo=[]
          var time=[]


          for (var i = 0; i <=(data.length / 6) - 1;++i){
           
            checkid.push(data[0 + 6 * i])
           photo.push(data[1 + 6 * i])
            time.push(data[2 + 6 * i])
            result.push(data[5 + 6 * i])
        
        
          if(i==0){
            markers.push({
              iconPath:"../icon/startpoint.png",
              id: i,
              latitude: parseFloat(data[4 + 6 * i]),
              longitude: parseFloat(data[3 + 6 * i]),
              width:"80rpx",

              height: "80rpx"
            })
          }
          else {

            if (i == (data.length / 6) - 1){
            markers.push({
              iconPath: "../icon/endpoint.png",
              id: i,
              latitude: parseFloat(data[4 + 6 * i]),
              longitude: parseFloat(data[3 + 6 * i]),
              width: "80rpx",

              height: "80rpx"
            })}
            else{

              markers.push({
                iconPath: "../icon/check.png",
                id: i,
                latitude: parseFloat(data[4 + 6 * i]),
                longitude: parseFloat(data[3 + 6 * i]),
                width: "60rpx",

                height: "60rpx"
              })



            }
          }

          
          }
          app.globalData.checkid=checkid
          app.globalData.photo = photo
          app.globalData.time = time
          app.globalData.result = result
         
        that.setData({
          latitude:markers[0].latitude,
          longitude: markers[0].longitude,
          markers:markers,
      polyline: [{
        points: markers,
        
            color: "#99FF00",
            width: 4,
            dottedLine: false
          }],

        })
          console.log(markers)
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


click: function (e) {


    app.globalData.currentid = e.markerId

    
wx.navigateTo({
  url: '../result2/result2',
})





  }

})
