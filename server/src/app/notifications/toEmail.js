const nodemailer = require("nodemailer");
const cron = require("node-cron");
const Card = require("../../models/card");
const repeat = require("../../app/functions/repeatDate");

module.exports = {
  // cắt thời gian định dạng "2022-03-11T13:48:00.000Z" => "[ 34, 21, 12, 3 ]"
  splitDatatimeToDate: function (datetime) {
    if (datetime) {
      let array = []; 
      datetime.forEach(function (date) {
        date = new Date(date);
        let arrayTi = [
          date.getMinutes(),
          date.getHours(),
          new Date(date).getDate(),
          new Date(date).getMonth() + 1,
        ];
        array.push(arrayTi);
      });
      return array;
    }
  },

  sendEmail: sendEmail,

  // async..await is not allowed in global scope, must use a wrapper
  notificationToEmail: async function () {
    /**
     * đăng ký lịch trình thông báo qua email
     *
     * selete [startDate,body] form datebase collection cards
     * sort startDate type asc
     */
    await Card.find({}, "repeat title body startTime endTime")
      .sort({ startDate: "asc" })
      .then((cards) => { 
        var listNotifiCard = [];

        if (cards) {
          //tạo mảng lưu thời gian thông báo, message của lời nhắc
          cards.forEach((card) => {
            if (card["startTime"] < card["endTime"]) {
              // get and push list if datetime bigger time now
              var now = new Date(Date.now());
              var startTime = card["startTime"];
              var endTime = card["endTime"];
              if (new Date(startTime) >= now || new Date(endTime) >= now) {
                const startTime = new Date(card["startTime"]).toLocaleString();
                const endTime = new Date(card["endTime"]).toLocaleString();
                const b = new Map(); 
 
                // check repeat for day
                // add time notificaltion for list
                if (card["repeat"]["day"] === true) {
                  b.set(
                    "time",
                    this.splitDatatimeToDate(
                      repeat.repeatDay(startTime, endTime)
                    )
                  );
                  // listTimeNotifiCard.push( this.splitDatatimeToDate(repeat.repeatDay(startTime, endTime)));
                  b.set("body", card.body);
                }

                // check repeat for weekly
                // add time notificaltion for list
                if (card["repeat"]["week"] === true) { 
                  b.set(
                    "time",
                    this.splitDatatimeToDate(
                      repeat.repeatWeekly(startTime, endTime)
                    )
                  );
                  // listTimeNotifiCard.push( this.splitDatatimeToDate(repeat.repeatDay(startTime, endTime)));
                  b.set("body", card.body); 
                }

                // check repeat for weekly
                // add time notificaltion for list
                if (card["repeat"]["month"] === true) {
                  b.set(
                    "time",
                    this.splitDatatimeToDate(
                      repeat.repeatMonth(startTime, endTime)
                    )
                  );
                  // listTimeNotifiCard.push( this.splitDatatimeToDate(repeat.repeatDay(startTime, endTime)));
                  b.set("body", card.body);
                }

                listNotifiCard.push(b);
              }
            }
          });
        } 

        if (listNotifiCard) {
          // đăng ký thời gian thông báo lời nhắc (task)
          listNotifiCard.forEach(function (a) {
            a = new Map(a); 

            var listTime = a.get("time");
            var body = a.get("body");
            if (listTime) { 

              listTime.forEach(function (time, index) {
                // init
                let m = time[0]; // mins
                let h = time[1]; // hour
                let d = time[2]; // day
                let M = time[3]; // month
                // đặt lịch trình với thư viện cron
                // "* * * * * *" tương ứng tường sao(*) là 1 giá trị thời gian
                // "mins hours dateOfMonth month dateOfWeek"
                // "*    *     *           *     *         "
                // console.log(m + "-" + h + "-" + d + "-" + M);

                cron.schedule(`${m} ${h} ${d} ${M} *`, () => {
                  // send email đã đăng ký
                  // tham số chuyền vào gồm: thời gian thông báo, nội dung thông báo, thời gian củ thể
                  sendEmail(`${m}:${h}`, body, time[index]);
                });
              });
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

function sendEmail(time, titleform, subject) {
  
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = nodemailer.createTestAccount();

  if(!time || !titleform || !subject) {
      console.error("time or title form or subject missing")
      return 
  }
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // t rue for 465, false for other ports
    auth: {
      user: "ledangtuankhoi2@gmail.com", // generated ethereal user
      pass: "tuan khoi", // generated ethereal password
    },
  });

  // send mail with defined transport object
  try {
    let info = transporter.sendMail({
      from: `"${time} - ${titleform}" ledangtuankhoi2@gmail.com`, // sender address
      to: "ledangtuankhoi@gmail.com", // list of receivers
      subject: `${subject}`, // Subject line
      text: "Hello world?", // plain text body
      html: `<table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">body</th>
          <th scope="col">startTime</th>
          <th scope="col">startDate</th>
          <th scope="col">endTime</th>
          <th scope="col">endDate</th>
        </tr>
      </thead>
      <tbody id="myUL">
        
          <tr>
            <td></td>
            <td> Temporibus nisi sint </td>
            <td>19:23</td>
            <td>18:41</td>
            <td>11/15/2011</td>
            <td>2/8/1983</td>
          </tr>
          <tr>
            <td></td>
            <td> Rerum ut est sed su </td>
            <td>10:28</td>
            <td>6:15</td>
            <td>10/2/1992</td>
            <td>5/2/1970</td>
          </tr>
          <tr>
            <td></td>
            <td> Ea laborum Et est d </td>
            <td>0:34</td>
            <td>15:21</td>
            <td>4/1/2020</td>
            <td>2/3/1998</td>
          </tr>
      </tbody>
    </table>`, // html body
    });
  } catch (error) {
    console.log(error);
  }
  console.log("send email successful");
}
