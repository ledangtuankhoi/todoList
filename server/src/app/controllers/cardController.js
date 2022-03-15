const Card = require("../../models/card");
const notificationToEmail = require("../notifications/toEmail");

class HomeController {
  index(req, res, next) {
    try {
      notificationToEmail.sendEmail("test", "test", "test");
    } catch (error) {
      console.log(error);
    }
  }

  async create(req, res, next) {  
    try {
      if (!req.body) {
        return res.sendStatus(403);
      }

      let startTime = new Date(req.body.startTime).toLocaleString();
      let endTime = new Date(req.body.endTime).toLocaleString();

      if (!startTime || !endTime) {
        startTime = null;
        endTime = null;
      }
      const card = new Card({
        title: req.body.title,
        body: req.body.body,
        startTime: startTime,
        endTime: endTime,
      });
      await card.save();
      res.redirect("back");
      console.log({ success: "true", message: "created" });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll(req, res, next) {
    try {
      await Card.deleteMany({});
      res.json({ success: "true", message: "DELETE ALL" });
    } catch (error) {
      console.error(error);
    }
  }

  async createTest(req, res, next) { 
    try {
      if (!req.body) {
        return res.sendStatus(403);
      }

      let startTime = new Date(req.body.startTime).toLocaleString();
      let endTime = new Date(req.body.endTime).toLocaleString(); 

      if (!startTime || !endTime) {
        startTime = null;
        endTime = null;
      }
      const card = new Card({
        title: req.body.title,
        body: req.body.body,
        startTime: startTime,
        endTime: endTime, 
        repeat: {
          day: req.body.repeat.day,
          week: req.body.repeat.week,
          month: req.body.repeat.month,
        },
      });
      await card.save();
      res.redirect("back");
      console.log({ success: "true", message: "created" });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new HomeController();
