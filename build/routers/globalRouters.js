"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _contentControllers = require("../controllers/contentControllers");
var _userControllers = require("../controllers/userControllers");
var _middlewares = require("../middlewares");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var globalRouter = _express["default"].Router();
globalRouter.get('/', _contentControllers.home);
globalRouter.get('/about', _contentControllers.about);
globalRouter.get('/youthkit', _contentControllers.youthkit);
globalRouter.route('/join').all(_middlewares.publicOnlyMiddleware).get(_userControllers.getJoin).post(_userControllers.postJoin);
globalRouter.get('/welcome', _userControllers.welcome);
globalRouter.route('/login').all(_middlewares.publicOnlyMiddleware).get(_userControllers.getLogin).post(_userControllers.postLogin);
globalRouter.get('/login/kakao/start', _middlewares.publicOnlyMiddleware, _userControllers.startKakaoLogin);
globalRouter.get('/login/kakao/finish', _middlewares.publicOnlyMiddleware, _userControllers.finishKakaoLogin);
globalRouter.get('/login/naver/start', _middlewares.publicOnlyMiddleware, _userControllers.startNaverLogin);
globalRouter.get('/login/naver/finish', _middlewares.publicOnlyMiddleware, _userControllers.finishNaverLogin);
globalRouter.get('/logout', _middlewares.protectorMiddleware, _userControllers.logout);
globalRouter.route('/login/findID').all(_middlewares.publicOnlyMiddleware).get(_userControllers.getFindID).post(_userControllers.postFindID);
globalRouter.get('/login/showID', _middlewares.publicOnlyMiddleware, _userControllers.showID);
globalRouter.route('/login/findPW').all(_middlewares.publicOnlyMiddleware).get(_userControllers.getFindPW).post(_userControllers.postFindPW);
// globalRouter.get("/login/findPW", findPW);
var _default = globalRouter;
exports["default"] = _default;