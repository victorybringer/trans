var config = require('../../utils/config')

const app=getApp()



var COS = require('../../utils/cos-wx-sdk-v5')


var cos = new COS({
  getAuthorization: function (params, callback) {//获取签名 必填参数


    var authorization = COS.getAuthorization({
      SecretId: config.SecretId,
      SecretKey: config.SecretKey,
      Method: params.Method,
      Key: params.Key
    });
    callback(authorization);
  }
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: '',
    longitude: '',
    fun:'start',
   
    process: '开始时消毒照片',
    markers: [{


      latitude: '',
      longitude: '',



    }
    ],
    image:'',
    
    text:'开始旅途'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

   

    wx.getLocation({
      type: 'wgs84',
      success(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [{


            latitude: res.latitude,
            longitude: res.longitude,



          }
          ]
        })
        wx.request({
          url: 'https://mercifuldruid.cn/trans/loadfunction?openid=' + app.globalData.openid,


          success(res) {
var data=res.data.trim().split("\n")
app.globalData.current=data[1]
            app.globalData.currentstate = data[0].trim()
          if(data[0].trim()=='0'){
            that.setData({
            
              text: '结束行程',
              fun:'end',
              process: '结束时消毒照片'
            })
          }
     
          }
        })
      }
    })
  },
  upload: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        that.setData({

          image: res.tempFilePaths[0]
        })




      }
    })


  },
  start:function(){
    var that=this
    wx.showLoading({
      title: '请等待',
    })
    var type = this.data.image.substring(this.data.image.length - 3)
    cos.postObject({
      Bucket: config.Bucket,
      Region: config.Region,
      Key: app.globalData.openid + "startkill."+type,
      FilePath: this.data.image,
      onProgress: function (info) {
        console.log(JSON.stringify(info));
      }
    }, )

   
    var url = "https://picture-1257147077.cos.ap-shanghai.myqcloud.com/" + app.globalData.openid + "startkill."+type
    wx.request({
      url: 'https://mercifuldruid.cn/trans/start?openid=' + app.globalData.openid + '&photo=' + url + '&latitude=' + that.data.latitude + '&longitude=' + that.data.longitude ,
      

      success(res) {
       
        wx.hideLoading()

        wx.showModal({

          showCancel: false,
          title: '用户设置',
          content: '设置成功',

          success(res) {
            wx.request({
              url: 'https://mercifuldruid.cn/trans/loadfunction?openid=' + app.globalData.openid,


              success(res) {
                var data = res.data.trim().split("\n")
                app.globalData.current = data[1]
                app.globalData.currentstate = data[0].trim()
              
                  that.setData({

                    text: '结束行程',
                    fun: 'end',
                    image:'',
                    process:'结束时消毒照片'
                  })
                

              }
            })
          }
        })



        



      }
    })

  },
  end: function () {
    var that = this
    wx.showLoading({
      title: '请等待',
    })
    var type = this.data.image.substring(this.data.image.length - 3)
    cos.postObject({
      Bucket: config.Bucket,
      Region: config.Region,
      Key: app.globalData.openid + "endkill."+type,
      FilePath: this.data.image,
      onProgress: function (info) {
        console.log(JSON.stringify(info));
      }
    }, )
    var url = "https://picture-1257147077.cos.ap-shanghai.myqcloud.com/" + app.globalData.openid + "endkill." + type
    wx.request({
      url: 'https://mercifuldruid.cn/trans/end?openid=' + app.globalData.openid + '&photo=' + url + '&latitude=' + that.data.latitude + '&longitude=' + that.data.longitude + '&id=' + app.globalData.current,


      success(res) {

        wx.hideLoading()

        wx.showModal({

          showCancel: false,
          title: '用户设置',
          content: '已结束行程',

          success(res) {
            wx.request({
              url: 'https://mercifuldruid.cn/trans/loadfunction?openid=' + app.globalData.openid,


              success(res) {
                var data = res.data.trim().split("\n")
                app.globalData.current = data[1]
                app.globalData.currentstate = data[0].trim()
              

              }
            })
          }
        })


        that.setData({

          image: '',
          text: '开始旅途',
          fun: 'start',
          process: '开始时消毒照片'
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

  }
})