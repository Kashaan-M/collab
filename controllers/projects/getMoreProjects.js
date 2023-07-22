const {
  sequelize: { models },
} = require('../../sequelize');
const { BadRequestError } = require('../../errors');

async function getMoreProjects(req, res) {
  const { agly } = req.body;
  const projects = await models.project.findAll({
    attributes: [
      'myRole',
      'otherRole',
      'title',
      'description',
      'createdAt',
      'id',
    ],
    order: [['createdAt', 'DESC']],
    limit: 1,
    offset: agly,
    include: [
      {
        model: models.user,
        attributes: { exclude: ['id', 'email', 'password', 'createdAt'] },
      },
      {
        model: models.comment,
        attributes: {
          exclude: ['id', 'userId', 'projectId', 'createdAt', 'updatedAt'],
        },
        include: [
          {
            model: models.user,
            attributes: { exclude: ['id', 'email', 'password', 'createdAt'] },
          },
        ],
      },
    ],
  });
  if (projects.length == 0) {
    throw new BadRequestError('Bad Request');
  }
  const data = projects.map((project) => project.toJSON());
  return res.status(200).json({ msg: 'success', data });
}
module.exports = getMoreProjects;
