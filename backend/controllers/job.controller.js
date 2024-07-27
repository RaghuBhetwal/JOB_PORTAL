import Job from '../models/job.model.js';

export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyID } = req.body;
        const userId = req.user.id; // Use req.user.id

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyID) {
            return res.status(400).json({
                message: "Something is Missing",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyID,
            created_by: userId
        });

        return res.status(200).json({
            message: "New Job Created Successfully",
            job,
            success: true
        });
    } catch (error) {
        console.error("Error creating job:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query).populate(
           { path:"company"}
        ).sort({createdAt:-1});

        if (!jobs.length) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.error("Error fetching job by ID:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

// Job created by Admin
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.user.id;
        const jobs = await Job.find({ created_by: adminId });

        if (!jobs.length) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error("Error fetching admin jobs:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};
