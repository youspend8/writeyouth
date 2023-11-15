import Community from "../model/Community";

export const postImage = (req, res) => {
  const { key, originalname, location } = req.file
  res.json({ key, originalname, location })
};

export const postCommunity = async (request, response) => {
  const { thumbnail, cycle, storage, memo } = request.body
  const files = (() => {
    if (request.files) {
      return request.files.map(file => file.key)
    }
    return []
  })()
  const community = await Community.create({
    user: request.session.loggedInUser._id,
    thumbnail: JSON.parse(thumbnail).key,
    cycle: cycle,
    storage: storage,
    memo: memo,
    createdAt: new Date(),
    modifiedAt: new Date(),
    files: files
  });
  await response.status(201)
      .location(`/community/${community._id.toString()}`)
      .end()
};

export const getCommunity = async (request, response) => {
  try {
    const communities = await (async() => {
      if (request.query.my) {
        return Community
            .find({ user: request.session.loggedInUser._id })
            .populate('user')
      }
      return Community
          .find()
          .populate('user')
          .sort({ createdAt: "desc" })
    })()
    response.json(communities)
    return
  } catch (e) {}
  response.status(404).json({ message: '비정상적인 접근입니다.' })
};

export const getCommunityById = async (request, response) => {
  const id = request.params.id
  if (id) {
    try {
      const community =
          await Community.findById(id).populate('user')
      response.json(community)
      return
    } catch (e) {}
  }
  response.status(404).json({ message: '비정상적인 접근입니다.' })
};

export const putCommunityById = async (request, response) => {
  const id = request.params.id
  const { body } = request
  if (id) {
    try {
      const increase = (() => {
        switch (body.emotion) {
          case 'good':
          case 'moved':
          case 'sad':
          case 'cheer': {
            return {
              [body.emotion]: 1
            }
          }
        }
      })()
      const community = await Community.findOneAndUpdate({
        _id: id
      }, {
        $inc: increase
      }, {
        returnOriginal: false
      })
      response.json(community)
      return
    } catch (e) {
      console.error(e)
    }
  }
  response.status(404).json({ message: '비정상적인 접근입니다.' })
};
