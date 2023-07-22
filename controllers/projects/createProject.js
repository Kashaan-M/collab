const {
  sequelize: { models },
} = require('../../sequelize');
const { BadRequestError } = require('../../errors');

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

module.exports = createProject;
