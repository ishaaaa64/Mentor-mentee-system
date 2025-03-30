import mongoose from "mongoose";

// Password generator function
function generatePassword(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

const TeamSchema = new mongoose.Schema({
    teamName: { 
        type: String, 
        required: [true, "Please provide a Unique Name"], 
        
    },
    leaderEmail: { 
        type: String, 
        required: [true, "Please provide a Unique Email"], 
        unique: true,
        match: [/.+\@.+\..+/, "Please provide a valid email"]  // Email validation
    },
    members: [
        {
            name: { type: String, required: true },
            email: { 
                type: String, 
                required: true, 
                match: [/.+\@.+\..+/, "Please provide a valid email"] 
            },
            course: { type: String, required: true },
            studentId: { type: String, default: null } // Set after joining
        }
    ],
    password: {
        type: String,
        required: true,
        minlength: [8, "Password must be at least 8 characters long"],
        default: () => generatePassword(10)  // Generating password with 10 characters
    }
});

// Create model
const Team = mongoose.model("Team", TeamSchema);
export default Team;
