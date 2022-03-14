module.exports = {
  repeatWeekly: function (startDate, endDate) {
    this.repeatDay(startDate, endDate, true);
    return;
  },
  repeatDay: function (startDate, endDate, booleanRepeatWeekly) {
    var daysOfYear = [];
    var dayStep = 1;

    stardate = new Date(startDate).toLocaleString("en");
    endDate = new Date(endDate).toLocaleString();

    if (!startDate || !endDate) {
      return console.log("missing start date or end date");
    }

    if (booleanRepeatWeekly) {
      dayStep = 7;
    }

    for (
      var d = new Date(startDate);
      d < new Date(endDate);
      d.setDate(d.getDate() + dayStep)
    ) {
      daysOfYear.push(new Date(d).toLocaleString());
    } 
  },
  repeatMonth: function (startDate, endDate) {
    var daysOfYear = [];

    if (!startDate || !endDate) {
     return console.log("missing start date or end date");
    }

    for (
      var d = new Date(startDate);
      d < new Date(endDate);
      d.setMonth(d.getMonth() + 1)
    ) { 
      daysOfYear.push(new Date(d).toLocaleString());
    } 
  },
};
