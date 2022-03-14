const nodemailer = require("nodemailer");
const cron = require("node-cron");
const Card = require("../../models/card");

module.exports = {
  // async..await is not allowed in global scope, must use a wrapper
  notificationToEmail: async function () {
    /**
     * đăng ký lịch trình thông báo qua email
     *
     * selete [startDate,body] form datebase collection cards
     * sort startDate type asc
     */
    await Card.find({}, "startDate body repeat")
      .sort({ startDate: "asc" })
      .then((cards) => {
        var listTimeNotifiCard = [];
        var listBodyNotifiCard = [];

        return console.log(cards);

        //tạo mảng lưu thời gian thông báo, message của lời nhắc
        cards.forEach((card, index) => {
          // get and push list if datetime bigger time now
          if (Date.parse(card["startDate"]) >= Date.now()) {
            console.log(
              "datetime bigger time now: " +
                this.splitDatatimeToDate(card["startDate"])
            );
            listTimeNotifiCard.push(
              this.splitDatatimeToDate(card["startDate"])
            );
          }
          listBodyNotifiCard.push(card["body"]);
        });

        // đăng ký thời gian thông báo lời nhắc (task)
        for (let index = 0; index < listTimeNotifiCard.length; index++) {
          // init
          let m = listTimeNotifiCard[index][0]; // mins
          let h = listTimeNotifiCard[index][1]; // hour
          let d = listTimeNotifiCard[index][2]; // day
          let M = listTimeNotifiCard[index][3]; // month
          // đặt lịch trình với thư viện cron
          // "* * * * * *" tương ứng tường sao(*) là 1 giá trị thời gian
          // "mins hours dateOfMonth month dateOfWeek"
          // "*    *     *           *     *         "
          cron.schedule(`${m} ${h} ${d} ${M} *`, () => {
            console.log(m + "-" + h + "-" + d + "-" + M);
            // send email đã đăng ký
            // tham số chuyền vào gồm: thời gian thông báo, nội dung thông báo, thời gian củ thể
            sendEmail(
              `${m}:${h}`,
              listBodyNotifiCard[index],
              listTimeNotifiCard[index]
            );
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // cắt thời gian định dạng "2022-03-11T13:48:00.000Z" => "[ 34, 21, 12, 3 ]"
  splitDatatimeToDate: function (datetime) {
    let array = [
      datetime.getMinutes(),
      datetime.getHours(),
      new Date(datetime).getDate(),
      new Date(datetime).getMonth() + 1,
    ];
    return array;
  },

  sendEmail: function (time, tileFrom, subject) {
    console.log(time);
    console.log(tileFrom);
    console.log(subject);

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = nodemailer.createTestAccount();

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
        from: `"${time} - ${tileFrom}" ledangtuankhoi2@gmail.com`, // sender address
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
  },

  
};
