"use strict";

var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _viewEngine = _interopRequireDefault(require("./config/viewEngine"));
var _web = _interopRequireDefault(require("./route/web"));
var _connectDB = _interopRequireDefault(require("./config/connectDB"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
require("dotenv").config();
var app = (0, _express["default"])();
app.use((0, _cors["default"])({
  credentials: true,
  origin: true
}));
app.use(_bodyParser["default"].json({
  limit: "50mb"
}));
app.use(_bodyParser["default"].urlencoded({
  limit: "50mb",
  "extends": true
}));
(0, _viewEngine["default"])(app);
(0, _web["default"])(app);
(0, _connectDB["default"])();
var port = process.env.PORT || 1080;
app.listen(port, function () {
  console.log("Backend NodeJS is running on port: " + port);
});