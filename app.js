require("dotenv").config();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var nationalitiesRouter = require("./routes/nationalities");
var spotsRouter = require("./routes/spots");
var sessionsRouter = require("./routes/sessions");
var messagesRouter = require("./routes/messages");
var app = express();
const cors = require("cors");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/nationalities", nationalitiesRouter);
app.use("/spots", spotsRouter);
app.use("/sessions", sessionsRouter);
app.use("/messages", messagesRouter);
module.exports = app;
