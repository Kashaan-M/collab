const {
  sequelize: { models },
  sequelize,
} = require('../../sequelize');
const { BadRequestError } = require('../../errors');

/**
 * @module getUserProjects
 * returns all projects which belong to user plus no of comments on a particular project
 * we only include title, and id of project in the return variable "projects"
 */
async function getUserProjects(req, res) {
  const myProjects = await models.project.findAll({
    where: { userId: req.user.id },
    attributes: ['id', 'title'],
    include: [
      {
        model: models.comment,
        attributes: ['id'],
      },
    ],
  });

  if (myProjects.length == 0) {
    throw new BadRequestError('Bad Request');
  }
  const projects = myProjects.map((project) => {
    return {
      id: project.id,
      title: project.title,
      comments: project.comments.length,
    };
  });

  return res.status(200).json({
    msg: 'success',
    projects,
    user: [req.user.displayName, req.user.email],
  });
}

module.exports = getUserProjects;
