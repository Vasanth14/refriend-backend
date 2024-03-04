const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');


const jobSchema = mongoose.Schema({
    title:{
        type: String,
        required:true,
        trim:true,
    },
    description:{
        type: String,
        required:true,
        trim:true
    },
    jobPoster:{
        type:String,
        required:false,
    },
    companyName:{
        type:String,
        required:true,
        trim:true
    },
    companyLink:{
        type:String,
        required:true,
        trim:true,
    },
    companyLocation:{
        type:String,
        required:false,
        trim:true,
    },
    skills:[{
        type:String,
        required:true,
        trim:true,
    }],
    salaryRange:{
        type:String,
        required:false,
    },
    experienceLevel:{
        type:String,
        required:false,
    },
    category:{
        type:String,
        required:false,
        trim:true,
    },
    benefits:[{
        type:String,
        required:false,
        trim: true,
    }],
    contactLinks:[{
        type:String,
        required:true,
    }],
    postedBy: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        companyName: {
            type: String,
            required: true
        },
        jobTitle: {
            type: String,
            required: true
        }
    },
    postedAt: {
        type: Date
    }
},{
    timestamps:true,
})

jobSchema.pre('save', function(next) {
    if (!this.postedAt) {
        this.postedAt = new Date();
    }
    next();
});

// add plugin that converts mongoose to json
jobSchema.plugin(toJSON);
jobSchema.plugin(paginate);

/**
 * @typedef Job
 */
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;