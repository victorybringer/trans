//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   
  },
onLoad:function(){

  app.getOpenid().then(function (res) {
    if (res.status == 200) {

      app.globalData.openid = wx.getStorageSync('openid')

      console.log(app.globalData.openid)
    } else {
      console.log(res.data);
    }
  });

},
 caruser:function(){


   wx.request({
     url: 'https://mercifuldruid.cn/trans/userfirsttime?openid=' + app.globalData.openid,

     success(res) {



       if (res.data == false) {







         wx.showModal({

           showCancel: false,
           title: '用户设置',
           content: '首次使用请先完善资料',

           success(res) {
             if (res.confirm) {
               wx.navigateTo({
                 url: '../first/first',
               })
             }





           }
         })



       }

       else {
         if (res.data == true) {
           wx.hideLoading()
        
           wx.navigateTo({
             url: '../caruser/caruser',
           })


         }

         else {
           wx.hideLoading()


           wx.showModal({

             showCancel: false,
             title: '网络错误',
             content: '网络错误',


           })


         }

       }

     }





   })









 },
  manager: function () {

    wx.navigateTo({
      url: '../otheruser/otheruser',
    })


  },




})
