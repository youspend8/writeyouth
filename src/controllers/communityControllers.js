import Community from "../model/Community";

export const community = (req, res) => {
  return res.render(`contents/community/community_list`, { pageTitle: '커뮤니티' });
};

export const communityWrite = (req, res) => {
  return res.render(`contents/community/community_write`, { pageTitle: '유언장 공유하기' });
};

export const communityDetail = async (req, res) => {
  const id = req.params.id
  console.log('id', id)
  const community = await Community.findById(id).populate('user')
  return res.render(`contents/community/community_detail`, {
    pageTitle: '유언장 상세정보',
    isOwn: community.user._id?.toString() === req.session.loggedInUser._id?.toString()
  });
};

export const communityEdit = async (req, res) => {
  const id = req.params.id
  console.log('id', id)
  const community = await Community.findById(id).populate('user')
  const isOwn = community?.user?._id?.toString() === req.session.loggedInUser?._id?.toString()
  if (isOwn) {
    return res.render(`contents/community/community_edit`, { pageTitle: '유언장 수정하기' });
  }
  return res.redirect(`/community/${id}`)
};

export const postWrite = (req, res) => {
  console.log(req.files);
  console.dir(req.files);
  // res.json({
  //   url: req.file.location
  // });
  res.json()
};
