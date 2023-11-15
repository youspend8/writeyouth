"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.youthkit = exports.recommend = exports.qrPage = exports.qna = exports.home = exports.detail = exports.about = void 0;
var _qrContents = require("../data/qrContents");
var home = function home(req, res) {
  var popup = req.query.popup;
  return res.render('home', {
    pageTitle: 'Home',
    popup: popup
  });
};
exports.home = home;
var about = function about(req, res) {
  return res.render('contents/about', {
    pageTitle: 'About'
  });
};
exports.about = about;
var youthkit = function youthkit(req, res) {
  // return res.render('contents/youthkit');
  return res.render('https://smartstore.naver.com/writeyouth/products/9056123573');
};
exports.youthkit = youthkit;
var qna = function qna(req, res) {
  var popup = req.query.popup;
  var id = req.params.id;
  return res.render("contents/qna_".concat(id), {
    pageTitle: 'QnA',
    popup: popup
  });
};
exports.qna = qna;
var detail = function detail(req, res) {
  return res.render('contents/detail', {
    pageTitle: '가이드북 플러스'
  });
};
exports.detail = detail;
var qrPage = function qrPage(req, res) {
  var id = req.params.id;
  return res.render("contents/qrpage".concat(id), {
    pageTitle: 'Contents',
    title: _qrContents.qrContents[id - 1].title,
    index: id,
    imgUrl: "/uploads/contents/qrThumbnail/".concat(id, ".jpg")
  });
};
exports.qrPage = qrPage;
var recommend = function recommend(req, res) {
  var popup = encodeURIComponent('현재 추천콘텐츠 서비스 개발 중입니다. \n조금만 기다려주세요.');
  return res.redirect('/contents/qna/1?popup=' + popup);
};
exports.recommend = recommend;