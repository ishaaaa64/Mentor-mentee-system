import express, { json } from "express";
import Team from "../models/Team.js";
import sendEmail from "../utils/sendEmail.js";
import mongoose from "mongoose";

const router = express.Router();

// Register a new team

router.post("/register", async (req, res) => {
  const { teamName, leaderEmail, members } = req.body;

  try {
      // Save team in DB with auto-generated password
      const newTeam = new Team({ 
          teamName, 
          leaderEmail, 
          members 
      });

      const savedTeam = await newTeam.save();

      console.log("Saved team members with IDs:", savedTeam.members);

      // Send email invitations with proper IDs
      try {
          // Send invitation emails to team members
          for (const member of savedTeam.members) {
              await sendEmail(
                  member.email,
                  `Join Team ${teamName}`,
                  
                  `<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="background: #ffffff; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <tr>
                    <td style="padding: 30px; text-align: center;">
                        <h2 style="color: #333; margin: 0 0 20px;">Join Our Team</h2>

                        <!-- Join Button -->
                      
                        <!-- Steps Section -->
                        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
                        <h3 style="color: #333;">Steps to Join:</h3>
                        <ol style="text-align: left; color: #555; font-size: 14px; line-height: 22px; padding-left: 20px;">
                            <li>Copy this link - (http://localhost:4000/api/team/join-team/${savedTeam._id})</li>
                            <li>Login to the student panel</li>
                            <li>Go to the 'Join Team' section</li>
                            <li>Insert the link</li>
                            <li>Click join</li>
                        </ol>
                    </td>
                </tr>
            </table>`
                  
              );
              console.log("Member ID:", member._id);  
          }

          // Create the table with the actual team data
          const body = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <h2 style="color: #2c3e50; text-align: center;">You are the team leader!</h2>
              
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                  <thead>
                      <tr>
                          <th style="background: #3498db; color: #fff; padding: 10px; border: 1px solid #ddd;">Team Name</th>
                          <th style="background: #3498db; color: #fff; padding: 10px; border: 1px solid #ddd;">Leader Email</th>
                          <th style="background: #3498db; color: #fff; padding: 10px; border: 1px solid #ddd;">UserID</th>
                          <th style="background: #3498db; color: #fff; padding: 10px; border: 1px solid #ddd;">Password</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td style="padding: 10px; border: 1px solid #ddd;">${savedTeam.teamName}</td>
                          <td style="padding: 10px; border: 1px solid #ddd;">${savedTeam.leaderEmail}</td>
                          <td style="padding: 10px; border: 1px solid #ddd;">${savedTeam._id}</td>
                          <td style="padding: 10px; border: 1px solid #ddd;">${savedTeam.password}</td>
                      </tr>
                  </tbody>
              </table>
          </div>`;

          // Send email to team leader
          await sendEmail(
              leaderEmail,
              `You have created Team ${teamName}`,
              body
          );

          res.status(201).json({ 
              message: "Team registered successfully! Invitations sent.", 
              teamId: savedTeam._id 
          });

      } catch (emailError) {
          console.error("Error sending emails:", emailError.message);
          return res.status(500).json({ 
              message: "Team registered, but email sending failed", 
              error: emailError.message 
          });
      }

  } catch (error) {
      console.error("Error registering team:", error.message);
      res.status(400).json({ 
          message: "Error registering team", 
          error: error.message 
      });
  }
});
// Join a team (member clicks the link)
router.post("/join-team/:teamId", async (req, res) => {
  const { teamId } = req.params;
  const { email, studentId } = req.body;
console.log(teamId,email,studentId);
  try {
    const team = await Team.findById(teamId);

    if (!team) return res.status(404).json({ message: "Team not found" });
    const member = team.members.find((m) => {  
      return m.email === email});
    if (!member) return res.status(400).json({ message: "Not invited to this team" });

    if (member.studentId) return res.status(400).json({ message: "You have already joined this team" });

    member.studentId = studentId; // Mark as joined
    await team.save();

    try {
      await sendEmail(email, "Welcome to the team!", `You have joined ${team.teamName}`);
      res.status(200).json({ message: "You have joined the team!" });
    } catch (emailError) {
      console.error("Error sending welcome email:", emailError.message);
    }

    const htmlResponse = `
    <html>
      <head>
        <title>Team Joined</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          h1 { color: #4CAF50; }
          p { color: #555; }
          ul { list-style: none; padding: 0; }
          li { padding: 5px 0; }
          .footer { margin-top: 20px; font-size: 12px; color: #888; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>You have joined the team!</h1>
          

          <div class="footer">
            <p>Thank you for joining the team!</p>
          </div>
        </div>
      </body>
    </html>
  `;
  res.send(htmlResponse)
    // res.json({ message: "You have joined the team!", teamDetails: team });
  } catch (error) {
    res.status(500).json({ message: "Error joining team", error: error.message });
  }
});
router.get("/join-team/:teamId/:studentId/:email", async (req, res) => {
  const { teamId ,email, studentId} = req.params;
  
console.log(teamId)
  try {
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });
    const member = team.members.find((m) => m.email === email);
    console.log(team.members)
    if (!member) return res.status(400).json({ message: "Not invited to this team" });

    if (member.studentId) return res.status(400).json({ message: "You have already joined this team" });

    member.studentId = studentId; // Mark as joined
    await team.save();

    try {
      await sendEmail(email, "Welcome to the team!", `You have joined ${team.teamName}`);
    } catch (emailError) {
      console.error("Error sending welcome email:", emailError.message);
    }

    const htmlResponse = `
    <html>
      <head>
        <title>Team Joined</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          h1 { color: #4CAF50; }
          p { color: #555; }
          ul { list-style: none; padding: 0; }
          li { padding: 5px 0; }
          .footer { margin-top: 20px; font-size: 12px; color: #888; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>You have joined the team!</h1>
          

          <div class="footer">
            <p>Thank you for joining the team!</p>
          </div>
        </div>
      </body>
    </html>
  `;
  res.send(htmlResponse)
    // res.json({ message: "You have joined the team!", teamDetails: team });
  } catch (error) {
    res.status(500).json({ message: "Error joining team", error: error.message });
  }
});

router.get("/Teamlogin", async (req, res) => {
  const { Ids, password } = req.query;  // Use query parameters for GET requests
console.log(Ids, password,req.query)
  try {
      // Convert Ids to ObjectId
      const objectId = new mongoose.Types.ObjectId(Ids);

      // Use `findOne()` with ObjectId and password
      const team = await Team.findOne({ _id: objectId, password: password });

      if (!team) {
          return res.status(404).json({ message: "Team not found or incorrect password" });
      }

      res.status(200).json(team);

  } catch (error) {
      console.error("Error fetching team:", error.message);
      res.status(500).json({ message: "Error fetching team", error: error.message });
  }
});
// NEW: Fetch team by ID
router.get("/:teamId", async (req, res) => {
  const { teamId } = req.params;
  try {
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: "Error fetching team", error: error.message });
  }
});

// ✅ NEW: Fetch Team Performance by ID
router.get("/:teamId/performance", async (req, res) => {
  const { teamId } = req.params;
  try {
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    res.json({
      teamId: team._id,
      teamName: team.teamName,
      leaderEmail: team.leaderEmail,
      performance: team.performance || [],
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching team performance", error: error.message });
  }
});

// ✅ NEW: Update Team Performance
router.post("/:teamId/performance", async (req, res) => {
  const { teamId } = req.params;
  const { studentId, marks, attendance } = req.body;

  try {
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    const member = team.members.find((m) => m.studentId === studentId);
    if (!member) return res.status(404).json({ message: "Student not found in this team" });

    // Update performance
    team.performance = team.performance || [];
    const existingRecord = team.performance.find((p) => p.studentId === studentId);

    if (existingRecord) {
      existingRecord.marks = marks;
      existingRecord.attendance = attendance;
    } else {
      team.performance.push({ studentId, marks, attendance });
    }

    await team.save();
    res.json({ message: "Performance updated successfully!", performance: team.performance });
  } catch (error) {
    res.status(500).json({ message: "Error updating performance", error: error.message });
  }
});

// ✅ NEW: Fetch All Teams (for Dashboard)
router.get("/all-teams", async (req, res) => {
  try {
    const teams = await Team.find({});
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teams", error: error.message });
  }
});

router.get("/get-matching-teams/:email/:studentId", async (req, res) => {
  const { email, studentId } = req.params;
console.log(email)
  if (!email || !studentId) {
      return res.status(400).json({ message: "Email and Student ID are required" });
  }

  try {
      // Find teams with matching email and studentId in members array
      const teams = await Team.find({
          members: {
              $elemMatch: {
                  email: email,
                  studentId: studentId
              }
          }
      });

      if (teams.length === 0) {
          return res.status(404).json({ message: "No matching teams found" });
      }

      res.status(200).json({
          message: "Matching teams found",
          teams
      });

  } catch (error) {
      console.error("Error fetching teams:", error.message);
      res.status(500).json({ message: "Error fetching teams", error: error.message });
  }
});





export default router;
