//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    record: [],
  },
  
  onShow: function (){
    var record = wx.getStorageSync('record');
    this.setData({
      record: record,
    })
  }

})
