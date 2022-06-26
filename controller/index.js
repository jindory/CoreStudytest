const { agoraStatesDiscussions } = require("../repository/discussions");
const discussionsData = agoraStatesDiscussions;
const discussionsController = {

  // TODO: 모든 discussion 목록을 조회
  findAll: (req, res) => {
    if(req.query){
      return res.status(200).json(discussionsData);
    }
  },
  
  // TODO: discussion 하나를 조회
  findById: (req, res) => { 
    if(req.params){
      let list = discussionsData.find((list) => {
       return req.params.id === String(list.id)
      })
      return res.status(200).send(list);
    }
  },

  // ADVANCED: discussion 하나를 생성
  createOne: (req, res) => {
    const { username, title, content } = req.body;
    if(req.query){
      const id = parseInt(Math.random() * 10000)
      const newDiscussion = {
        id,
        username,
        title,
        content,
        createdAt: new Date().toISOString()
      };
      discussionsData.unshift(newDiscussion);
      return res.status(200).send('🎉 데이터 추가');
    }
  },

  // ADVANCED: discussion 하나를 수정
  updateById: (req, res) => {
    if(req.params){
      const idx = discussionsData.findIndex((d) => d.id === Number(req.params.id));
      const updated = {
        ...discussionsData[idx], ...req.body,
        createdAt: new Date().toISOString()
      };
      discussionsData.splice(idx, 1, updated);
      return res.status(200).send('🎉 데이터 수정');
    }
  },

  // ADVANCED: discussion 하나를 삭제
  deleteById: (req, res) => {
    if(req.params){
      const idx = discussionsData.findIndex((d) => d.id === Number(req.params.id));
      discussionsData.splice(idx, 1);
      return res.status(200).send('🎉 데이터 삭제');
    }
  },
}; 


module.exports = {
  discussionsController,
};


