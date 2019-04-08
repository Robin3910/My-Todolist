Page({
  /**
   * 页面的初始数据
   */
  data: {
    todolist:[],
    record: [],
    inputValue: '',
    allCompleted: false,
    leftCount: 0,
  },

  save: function (){
    wx.setStorageSync('todo', this.data.todolist);
    wx.setStorageSync('record', this.data.record);
  },
  load: function (){
    var todolist = wx.getStorageSync('todo');
    var record = wx.getStorageSync('record');
    var leftCount = todolist.filter(function (item){
      return !item.checked;
    }).length;
    this.setData({
      todolist: todolist,
      leftCount: leftCount,
      record: record,
    });
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.load();
    this.inputChangeHandle = function (e){
      this.setData({inputValue: e.detail.value});
    }
    this.addTodoHandle = function (){
      if(this.data.inputValue){
        this.data.todolist.push({
          title: this.data.inputValue,
          checked: false,
        });
        this.data.record.unshift({
          title: this.data.inputValue,
          type: 'Add',
          date: new Date(),
        })
        this.data.leftCount ++;
        this.setData({
          inputValue: '',
          todolist: this.data.todolist,
          leftCount : this.data.leftCount,
        });
      }
      this.save();
    }
    this.toggleHandle = function (e){
      var index = e.currentTarget.dataset.index;
      this.data.todolist[index].checked = this.data.todolist[index].checked ? false : true;
      var type = this.data.todolist[index].checked ? "Finished" : "Restart";
      this.data.leftCount += this.data.todolist[index].checked ? -1 : 1;
      this.data.record.unshift({
        title: this.data.todolist[index].title,
        type: type,
        date: new Date(),
      })
      this.setData({
        todolist: this.data.todolist,
        leftCount: this.data.leftCount
      });
      this.save();
    }
    this.deleteTodo = function (e){
      var todolist = this.data.todolist;
      var index = e.currentTarget.dataset.index;
      var record = this.data.record;
      record.unshift({
        title: todolist[index].title,
        type: 'Delete',
        date: new Date()
      })
      this.data.leftCount += todolist[index].checked ? 0 : -1;
      todolist.splice(index, 1);
      this.setData({
        todolist: todolist,
        leftCount: this.data.leftCount,
        record: record,
      });
      this.save();
    },
    this.toggleAll = function (){
      var todolist = this.data.todolist;
      this.data.allCompleted = !this.data.allCompleted;
      this.data.leftCount = !this.data.allCompleted ? this.data.todolist.length : 0;
      var type = this.data.allCompleted ? 'All-completed' : 'All-restart';
      var record = this.data.record;
      record.unshift({
        title: 'All',
        type: type,
        date: new Date(),
      })
      for(var i = 0; i < todolist.length; i++){
        todolist[i].checked = this.data.allCompleted;
      }
      this.setData({
        todolist : todolist,
        leftCount: this.data.leftCount,
      });
      this.save();
    }
    this.clearCompleted = function (){
      var todolist = this.data.todolist;
      todolist = todolist.filter(function (item){
        return !item.checked;
      });
      this.data.record.unshift({
        title: 'Clear-completed',
        type: 'Clear-completed',
        date: new Date(),
      })
      var leftCount = todolist.length;
      this.setData({
        todolist: todolist,
        leftCount : leftCount
      });
      this.save();
    }

    
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