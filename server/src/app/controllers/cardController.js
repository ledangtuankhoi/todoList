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

      let startTime = new Date(req.body.startTime);
      let endTime = new Date(req.body.endTime);

      if (!startTime || !endTime) {
        startTime = null;
        endTime = null;
      }
      const card = new Card({
        title: req.body.title,
        body: req.body.body,
        startDate: startTime,
        endDate: endTime,
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
      console.log(error);
    }
  }
}

module.exports = new HomeController();
