const router = require('express').Router();
const {
  createProject,
  getProjectDetails,
  getProjects,
  getMoreProjects,
  getUserProjects,
} = require('../controllers/projects/index');
const Joi = require('joi');
const firstValidate = require('../middlewares/firstValidate');

const schema = Joi.object({
  ownRole: Joi.string()
    .max(40)
    .message("role can't be longer than 40 characters")
    .required(),
  otherRole: Joi.string()
    .max(40)
    .message("role can't be longer than 40 characters")
    .required(),
  title: Joi.string()
    .max(150)
    .message("title can't be longer than 150 characters")
    .required(),
  description: Joi.string().required(),
  purpose: Joi.string()
    .max(40)
    .message("purpose can't be longer than 40 characters"),
});

const singleSchema = Joi.object({
  project: Joi.number().integer().message('bad request'),
});
router.post('/', firstValidate(schema), createProject);
router.post('/project/detail', firstValidate(singleSchema), getProjectDetails);
router.post('/more', getMoreProjects);
router.get('/', getProjects);
router.get('/myprojects', getUserProjects);

module.exports = router;
