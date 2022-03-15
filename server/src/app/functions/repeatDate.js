module.exports = {
    // lặp thứ qua từng tuần
    // @return list date when repeat for weekly
  repeatWeekly: function (startDate, endDate) {

    
    // check null
    if(!startDate || !endDate) {
      loge.error('miss parameter')
      return 
    } 

    // tái sự dụng func repeatDay thêm vào thuộc tính true cho booleanRepeatWeekly
    // vì lặp ngày khác với lặp hằng ngày chỉ là 7 ngày và 1 ngày
    return this.repeatDay(startDate, endDate, true);
  },
    //   lặp hằng ngày
    // @return list date when repeat for day
  repeatDay: function (startDate, endDate, booleanRepeatWeekly) {
    var daysOf = [];
    var dayStep = 1;

    // check null
    if(!startDate || !endDate) {
      loge.error('miss parameter')
      return 
    }
    
    //check null startDate, endDate
    // @return message and beak
    if (!startDate || !endDate) {
      return console.error("missing start date or end date");
    }

    // thuộc tính dành cho tính lặp theo tuần
    if (booleanRepeatWeekly) {
      dayStep = 7;
    }

    // xác định các ngày lặp theo quy định
    // lưu vào dayOf
    for (
      var d = new Date(startDate);
      d <= new Date(endDate);
      d.setDate(d.getDate() + dayStep)
    ) {
      daysOf.push(new Date(d).toLocaleString());
    }  
    return daysOf
  },
  repeatMonth: function (startDate, endDate) {
    var daysOf = [];


    if (!startDate || !endDate) {
     return console.error("missing start date or end date");
    }

    for (
      var d = new Date(startDate);
      d < new Date(endDate);
      d.setMonth(d.getMonth() + 1)
    ) { 
      daysOf.push(new Date(d).toLocaleString());
    } 
    return daysOf

  },
};
