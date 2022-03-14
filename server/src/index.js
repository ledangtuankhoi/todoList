const express = require("express");
const route = require("./routes");
const morgan = require("morgan");
const filepath = require("path");
const connect = require("./config/db");
const bodyParser = require("body-parser");
const helper = require("./app/helper/handlebars");
const notification = require("./app/notifications/toEmail");
const Card = require("./models/card");
const repeatDate = require("./app/functions/repeatDate")

require("dotenv").config();

const app = express();
const PORT = 5000;


 repeatDate.repeatMonth('03/10/2022','05/15/2022');

// notification to email
notification.notificationToEmail();

// To listen for changes to your MongoDB collection, set up a Mongoose Model.watch.
 Card.watch().on("change", (change) => { 
  // notification to email
  notification.notificationToEmail();
});

//morgan
app.use(morgan("combined"));
// handlebars

app.engine(".hbs", helper.engine);
app.set("view engine", ".hbs");
app.set("views", filepath.join(__dirname, "views"));
//connect mongoDB dâtbase
connect();
//set file static
app.use(express.static(filepath.join(__dirname, "public")));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//init route
route(app);

app.listen(PORT, () => {
  console.log(`\nlisten to http://localhost:${PORT}`);
});
