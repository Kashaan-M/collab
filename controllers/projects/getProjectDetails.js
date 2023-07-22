const {
  sequelize: { models },
} = require('../../sequelize');
const { BadRequestError } = require('../../errors');

/**
 * returns project details of a single project
 */
async function getProjectDetails(req, res) {
  const { project } = req.body;

  const projectDetail = await models.project.findOne({
    where: { id: project },
    attributes: ['myRole', 'otherRole', 'title', 'description', 'createdAt'],
    include: [
      {
        model: models.comment,
        attributes: ['comment'],
        include: [{ model: models.user, attributes: ['displayName'] }],
      },
    ],
  });

  if (projectDetail == null) {
    throw new BadRequestError('Bad Request');
  }
  const json = projectDetail.toJSON();

  const detail = {
    username: req.user.displayName,
    ownRole: json['myRole'],
    otherRole: json['otherRole'],
    title: json['title'],
    description: json['description'],
    createdAt: json.createdAt,
    comments: json['comments'],
  };

  return res.status(200).json({ msg: 'success', detail });
}

module.exports = getProjectDetails;
