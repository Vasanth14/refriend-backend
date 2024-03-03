const express = require('express');
const validate = require('../../middlewares/validate');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');
const jobController = require('../../controllers/jobs.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageJobs'), jobController.createJob)
  .get(auth('getJobs'), jobController.getJobs);

router
  .route('/:jobId')
  .get(auth('getJobs'), jobController.getJob)

module.exports = router;