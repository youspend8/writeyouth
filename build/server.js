"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _cors = _interopRequireDefault(require("cors"));
var _connectMongo = _interopRequireDefault(require("connect-mongo"));
var _globalRouters = _interopRequireDefault(require("./routers/globalRouters"));
var _contentRouters = _interopRequireDefault(require("./routers/contentRouters"));
var _userRouters = _interopRequireDefault(require("./routers/userRouters"));
var _policyRouters = _interopRequireDefault(require("./routers/policyRouters"));
var _communityRouters = _interopRequireDefault(require("./routers/communityRouters"));
var _apiRouters = _interopRequireDefault(require("./routers/apiRouters"));
var _middlewares = require("./middlewares");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
var corsOptions = {
  origin: 'https://writeyouth.s3.ap-northeast-2.amazonaws.com/b47570143d8d8c1ca467298a5d0a691b',
  crendentials: true,
  optionsSuccessStatus: 200
};
app.use((0, _cors["default"])(corsOptions));
app.use(_express["default"].json());
var logger = (0, _morgan["default"])('dev');
app.use(logger);
app.use('/assets', _express["default"]["static"]('assets')); // 정적 파일인 "assets" 폴더 서버에 로드
app.use('/uploads', _express["default"]["static"]('uploads'));

// app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs' }));
// app.set('view engine', '.hbs');
app.set('views', './src/views');
app.set('view engine', 'pug');

// session 미들웨어
app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    // maxAge: 10000,
  },
  store: _connectMongo["default"].create({
    mongoUrl: process.env.DB_URL,
    secret: 'thisshouldbeabettersecret!',
    touchAfter: 24 * 60 * 60
  }) // session을 mongoDB에 저장
}));

app.use(_middlewares.localsMiddleware); // 전역 변수 선언 미들웨어
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use('/', _globalRouters["default"]);
app.use('/users', _userRouters["default"]);
app.use('/contents', _contentRouters["default"]);
app.use('/community', _communityRouters["default"]);
app.use('/policy', _policyRouters["default"]);
app.use('/api', _apiRouters["default"]);
var _default = app;
exports["default"] = _default;