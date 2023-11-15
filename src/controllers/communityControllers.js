export const community = (req, res) => {
  return res.render(`contents/community/community_list`, { pageTitle: '커뮤니티' });
};

export const communityWrite = (req, res) => {
  return res.render(`contents/community/community_write`, { pageTitle: '유언장 공유하기' });
};

export const communityDetail = (req, res) => {
  return res.render(`contents/community/community_detail`, { pageTitle: '유언장 상세정보' });
};

export const postWrite = (req, res) => {
  console.log(req.files);
  console.dir(req.files);
  // res.json({
  //   url: req.file.location
  // });
  res.json()
};
