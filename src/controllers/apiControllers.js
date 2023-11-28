import Community from "../model/Community";

export const postImage = (req, res) => {
  const { key, originalname, location } = req.file
  res.json({ key, originalname, location })
};

export const postCommunity = async (request, response) => {
  const { cycle, storage, memo } = request.body
  const files = (() => {
    if (request.files) {
      return request.files.map(file => file.key)
    }
    return []
  })()
  const community = await Community.create({
    user: request.session.loggedInUser._id,
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

export const deleteCommunityById = async (request, response) => {
  const id = request.params.id
  if (id) {
    try {
      const community = await Community.findById(id).populate('user')
      if (community.user._id?.toString() !== request.session.loggedInUser._id?.toString()) {
        response.status(403).json({ message: '비정상적인 접근입니다.' })
        return
      }
      community.deleteOne()
      response.json()
      return
    } catch (e) {}
  }
  response.status(404).json({ message: '비정상적인 접근입니다.' })
};

export const putCommunityById = async (request, response) => {
  const id = request.params.id
  const { body } = request
  const { cycle, storage, memo, originFiles, removedFiles } = body
  let allFiles = (() => {
    if (originFiles) {
      let removedFilesArray
      if (Array.isArray(removedFiles)) {
        removedFilesArray = [...removedFiles]
      } else {
        removedFilesArray = [ removedFiles ]
      }
      if (Array.isArray(originFiles)) {
        return [...originFiles].filter(fileId => removedFilesArray?.indexOf(fileId) === -1)
      } else {
        return [ originFiles ].filter(fileId => removedFilesArray?.indexOf(fileId) === -1)
      }
    }
    return []
  })()
  const files = (() => {
    if (request.files) {
      return request.files.map(file => file.key)
    }
    return []
  })()
  allFiles = [
    ...allFiles,
    ...files
  ]
  if (id) {
    try {
      let updated = {
        cycle: cycle,
        storage: storage,
        memo: memo,
        modifiedAt: new Date(),
        files: allFiles
      }
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
      if (body.emotion) {
        updated = {
          $inc: increase
        }
      }
      const community = await Community.findOneAndUpdate({
        _id: id
      }, updated, {
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
