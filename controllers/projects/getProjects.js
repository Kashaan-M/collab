const {
  sequelize: { models },
} = require('../../sequelize');
const { BadRequestError } = require('../../errors');

async function getProjects(req, res) {
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
  const data = projects.map((project) => project.toJSON());
  return res.status(200).json({ msg: 'success', data });
}
module.exports = getProjects;
