const httpStatus = require('http-status');
// const { User } = require('../models');
const { Job } = require('../models');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

/**
 * Create a job
 * @param {Object} jobBody
 * @param {string} userId
 * @returns {Promise<Job>}
 */


const createJob = async (jobBody, userId) => {
    if (!userId) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'User ID is required for creating a job');
    }
  
    try {
      // Fetch the user details using userId
      const user = await User.findById(userId);
  
      if (!user) {
        throw new Error('User not found');
      }
  
      // Create the job object with user details embedded within postedBy field
      const job = new Job({
        ...jobBody,
        postedBy: {
          id: user._id,
          name: user.name,
          email: user.email,
          companyName: user.companyName,
          jobTitle: user.jobTitle
          // Add other user details as needed
        }
      });
  
      // Save the job to the database
      await job.save();
  
      // Return the created job
      return job;
    } catch (error) {
      // Handle errors
      throw new Error(`Failed to create job: ${error.message}`);
    }
  };
  

/**
 * Query for jobs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryJobs = async (filter, options) => {
  // Set default sorting to descending order by createdAt field if sortBy option is not provided
  if (!options.sortBy) {
    options.sortBy = 'createdAt:desc';
  }
  
  const jobs = await Job.paginate(filter, options);
  return jobs;
};


/**
 * Get job by id
 * @param {ObjectId} id
 * @returns {Promise<Job>}
 */
const getJobById = async (id) => {
    return Job.findById(id);
  };
  

module.exports = {
  createJob,
  queryJobs,
  getJobById,
};
