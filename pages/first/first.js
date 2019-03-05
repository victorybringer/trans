const app = getApp()

var config = require('../../utils/config')





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
   name:'',
   id:'',
   carnumber:'',
   
   
   
   
   image1:'',
   iamge2:''

  }, 
  
 
confirm:function(){
  var that=this
  wx.request({
   
  })


},
choose1:function(){
  var that=this
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      that.setData({

        image1: res.tempFilePaths[0]
      })
    
      

     
    }
  })


},
  name: function (e) {

    this.setData({


      name: e.detail.value


    })





  },
  carnumber: function (e) {

    this.setData({


      carnumber: e.detail.value


    })





  },
  id: function (e) {

    this.setData({


      id: e.detail.value


    })





  },
  choose2: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        that.setData({
          image2: res.tempFilePaths[0]

        })
     
      }
    })


  }, /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
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


  confirm:function(){


    wx.showLoading({
      title: '请等待',
    })

    var type1 = this.data.image1.substring(this.data.image1.length - 3)
    var type2 = this.data.image2.substring(this.data.image2.length - 3)
    var url1 = "https://picture-1257147077.cos.ap-shanghai.myqcloud.com/" + app.globalData.openid + "author." +type1

    console.log(url1)
    var url2 = "https://picture-1257147077.cos.ap-shanghai.myqcloud.com/" + app.globalData.openid + "carimage." + type2
    var that=this
    cos.postObject({
      Bucket: config.Bucket,
      Region: config.Region,
      Key: app.globalData.openid+"author."+type1,
      FilePath: this.data.image1,
      onProgress: function (info) {
        console.log(JSON.stringify(info));
      }
    }, )
    cos.postObject({
      Bucket: config.Bucket,
      Region: config.Region,
      Key: app.globalData.openid + "carimage."+type2,
      FilePath: this.data.image2,
      onProgress: function (info) {
        console.log(JSON.stringify(info));
      }
    }, )

            wx.request({
              url: 'https://mercifuldruid.cn/trans/uploadprofile?name=' + that.data.name + '&id=' + that.data.id + '&carnumber=' + that.data.carnumber + '&author=' + url1 + '&carimage=' + url2 + '&openid=' + app.globalData.openid,

              success(res) {
             
                wx.hideLoading()
                wx.showModal({

                  showCancel: false,
                  title: '用户设置',
                  content: '设置成功',

                  success(res) {
                    if (res.confirm) {
                      wx.redirectTo({
                     


                        url: '../caruser/caruser',
                      })
                    }
                  }
                })
              }
            })




          }
        
        
   


  
})