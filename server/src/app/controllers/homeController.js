const mongoose = require("mongoose");
const Card = require("../../models/card");

class HomeController {
  index(req, res, next) {
    const cards = Card.find({})
      .then((cards) => {
        cards = cards.map((card) => card.toObject());
        // return console.log(cards);;
        // res.json({cards});
        res.render("home", {
          cards: cards,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

module.exports = new HomeController();
