const router = require('express').Router();
const { addComment } = require('../controllers/comment');
const Joi = require('joi');
const firstValidate = require('../middlewares/firstValidate');

const schema = Joi.object({
  comment: Joi.string().required(),
  project: Joi.number().integer().message('bad request'),
});

const singleSchema = Joi.object({
  project: Joi.number().integer().message('bad request'),
});
router.post('/', firstValidate(schema), addComment);
//router.post('/project/detail', firstValidate(singleSchema), getProjectDetail);
// get projects
// router.get('/',getProjects)

module.exports = router;
