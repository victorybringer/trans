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
   input:'',
  pass:'',
   load:"false",
qualified:'0'

  },
  radioChange: function (e) {
   this.setData({

     pass:e.detail.value
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
  
  },
  history:function(){


  },
input:function(e){
  this.setData({


    input: e.detail.value


  })

},

search:function(){
var that=this
var data=''
  wx.scanCode({
   
    success(res) {
     data=res.result
     that.data.input=data
      console.log(res)
      wx.showLoading({
        title: '请等待',
      })
      wx.request({
        url: 'https://mercifuldruid.cn/trans/loadstate?openid=' + data,

        success(res) {
          var data = res.data.trim().split("\n")
          wx.hideLoading()

          that.setData({
            id: data[2],
            name: data[1],
            carnumber: data[3],
            image1:  data[4],
            image2:   data[5],
            load:'true',
            qualified: data[0].trim(),
             pdf: data[6]
          })
console.log(that.data.qualified)



        }
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
confirm:function(){






  var that=this
  var pdf ='https://picture-1257147077.cos.ap-shanghai.myqcloud.com/'+that.data.input+'.docx'
  wx.showLoading({
    title: '请等待',
  })

  wx.request({
    url: 'https://mercifuldruid.cn/trans/word?openid=' + that.data.input ,

    success(res) {
  wx.request({
    url: 'https://mercifuldruid.cn/trans/pass?openid=' + that.data.input + "&qualified=" + that.data.pass + "&pdf=" + pdf + "&user=" + app.globalData.user,

    success(res) {
     
      wx.hideLoading()

   that.setData({
     
     load:'true',
     qualified:'1'
   })
      wx.showModal({

        showCancel: false,
        title: '设置',
        content: '审核完毕',

        
      })
      wx.request({
        url: 'https://mercifuldruid.cn/trans/loadstate?openid=' + that.data.input,

        success(res) {
          var data = res.data.trim().split("\n")
          wx.hideLoading()

          that.setData({
         
            pdf: data[6]
          })
         



        }
      })

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
  history:function(){

    wx.navigateTo({
      url: '../managehistory/managehistory',
    })
  }
})