const {
  sequelize: { models },
} = require('../sequelize');

async function addComment(req, res) {
  const { comment, project: projectId } = req.body;
  const add = await models.comment.create({
    userId: req.user.id,
    projectId,
    comment,
  });
  res.status(200).json({ msg: 'success' });
}
module.exports = { addComment };
