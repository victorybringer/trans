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
    
   exist:0,
   load:"false",


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
   var that=this
    wx.getLocation({
      type: 'wgs84',
      
      
      success(res) {
      that.setData({

      
          latitude: res.latitude,
          longitude: res.longitude,
        
      })
      }
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
        url: 'https://mercifuldruid.cn/trans/exist?id=' + data+'&checkid='+app.globalData.user,

        success(res) {

   if(res.data==0){
        that.setData({

          exist:'0'
        })
   }
   else{

     that.setData({

       exist: '1'
     })

   }
        
        }
      })

      if(that.data.exist=='0'){
      wx.request({
        url: 'https://mercifuldruid.cn/trans/loadstate2?id=' + data,

        success(res) {
          var data = res.data.trim().split("\n")
         

          that.setData({
            id: data[3],
            name: data[2],
            carnumber: data[4],
            image1:  data[5],
            image2:   data[6],
            image3: data[0],
            load:'true',
          
          })




        }
      })
      }
      wx.hideLoading()
    }
  })
  
},

confirm:function(){
  var that=this
  wx.showLoading({
    title: '请等待',
  })
  wx.request({
    url: 'https://mercifuldruid.cn/trans/pass2?id=' + that.data.input + ' &checkid=' + app.globalData.user + '&result=' + that.data.text + '&latitude=' + that.data.latitude 
    + '&longitude=' + that.data.longitude, 

    success(res) {
     
      wx.hideLoading()

   that.setData({

     load:'false'
   })
      wx.showModal({

        showCancel: false,
        title: '设置',
        content: '检查完毕',

        
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
    url: '../checkhistory/checkhistory',
  })
  }
})