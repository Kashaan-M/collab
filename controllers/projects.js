const {
  sequelize: { models },
} = require('../sequelize');
const { BadRequestError } = require('../errors');

async function createProject(req, res) {
  const { ownRole, otherRole, title, description, purpose } = req.body;

  // check if this  userId has project with this title
  const isExist = await models.project.findOne({
    where: { userId: req.user.id, title },
  });

  if (isExist) {
    throw new BadRequestError('Project Exists');
  }

  const addProject = await models.project.create({
    myRole: ownRole,
    otherRole,
    title,
    description,
    purpose,
    userId: req.user.id,
  });
  const json = addProject.toJSON();
  const secret = `${json.id}_${json.title}`;

  const project = {
    username: req.user.displayName,
    email: req.user.email,
    title: json.title,
    project: json.id,
  };

  return res.status(200).json({ msg: 'sucess', project });
}

async function getProjectDetail(req, res) {
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

async function getMoreProject(req, res) {
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
  const data = projects.map((project) => project.toJSON());
  return res.status(200).json({ msg: 'success', data });
}

module.exports = {
  createProject,
  getProjectDetail,
  getProjects,
  getMoreProject,
};
