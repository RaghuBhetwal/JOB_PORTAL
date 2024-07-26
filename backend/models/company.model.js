import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    website: {
        type: String
    },
    logo: {
        type: String  // Assuming this is a URL to the company's logo
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",  // This should match the model name of your User schema
        required: true
    }
}, 
{
    timestamps: true  // Automatically add createdAt and updatedAt fields
});

const Company = mongoose.model("Company", companySchema);

export default Company;
