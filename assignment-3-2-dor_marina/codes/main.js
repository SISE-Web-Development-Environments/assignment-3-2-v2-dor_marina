require("dotenv").config();
//#region express configures
var cors = require('cors')

var express = require("express");
var path = require("path");
var logger = require("morgan");
const session = require("client-sessions");
const DButils = require("./modules/DButils");

const app = express();
var port = process.env.PORT || "3000";

app.use(logger("dev")); //logger
app.use(express.json()); // parse application/json
app.use(
  session({
    cookieName: "session", // the cookie key name
    secret: process.env.COOKIE_SECRET, // the encryption key
    duration: 120 * 60 * 1000, // expired after 120 min
    activeDuration: 0, // if expiresIn < activeDuration,
    //the session will be extended by activeDuration milliseconds
    cookie: {
        httpOnly:false
    }
  })
);
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "public"))); //To serve static files such as images, CSS files, and JavaScript files

const corsConfig = {
  origin: true,
  credentials: true
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

//#endregion
const user = require("./routes/user");
const profile = require("./routes/profile");
const recipes = require("./routes/recipes");

//#region cookie middleware
app.use(function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM users")
      .then((users) => {
        if (users.find((x) => x.user_id === req.session.user_id)) {
          req.user_id = req.session.user_id;
        }
        next();
      })
      .catch((error) => next());
  } else {
    next();
  }
});
//#endregion

app.get("/", (req, res) => res.send("welcome"));

app.use("/user", user);
app.use("/profile", profile);
app.use("/recipe", recipes);

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).send({ message: err.message, success: false });
});

const server = app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

process.on("SIGINT", function () {
  if (server) {
    server.close(() => console.log("server closed"));
  }
  process.exit();
});
