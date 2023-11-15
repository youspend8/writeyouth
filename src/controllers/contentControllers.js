import {qrContents} from '../data/qrContents';

export const home = (req, res) => {
  const popup = req.query.popup;
  return res.render('home', {
    pageTitle: 'Home',
    popup,
  });
};

export const about = (req, res) => {
  return res.render('contents/about', { pageTitle: 'About' });
};

export const youthkit = (req, res) => {
  // return res.render('contents/youthkit');
  return res.render(
    'https://smartstore.naver.com/writeyouth/products/9056123573'
  );
};

export const qna = (req, res) => {
  const popup = req.query.popup;
  let id = req.params.id;
  return res.render(`contents/qna_${id}`, { pageTitle: 'QnA', popup });
};

export const detail = (req, res) => {
  return res.render('contents/detail', { pageTitle: '가이드북 플러스' });
};

export const qrPage = (req, res) => {
  const id = req.params.id;
  return res.render(`contents/qrpage${id}`, {
    pageTitle: 'Contents',
    title: qrContents[id - 1].title,
    index: id,
    imgUrl: `/uploads/contents/qrThumbnail/${id}.jpg`,
  });
};

export const recommend = (req, res) => {
  const popup = encodeURIComponent(
    '현재 추천콘텐츠 서비스 개발 중입니다. \n조금만 기다려주세요.'
  );
  return res.redirect('/contents/qna/1?popup=' + popup);
};
