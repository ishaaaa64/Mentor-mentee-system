import app from "../backend/app.js"; // Your existing Express app
import dotenv from "dotenv";
import teamRoutes from "./routes/teamRoutes.js"; // Your team routes
import http from "http"; // Import http to create a server
import socketIo from "socket.io"; // Import Socket.io for WebSocket functionality

dotenv.config({ path: "./.env" }); // Load environment variables

// Use your existing Express app
app.use("/api/team", teamRoutes);

// Create an HTTP server that will handle both Express and WebSockets
const server = http.createServer(app);

// Initialize Socket.io and attach it to the HTTP server
const io = socketIo(server);

// WebSocket logic for real-time chat feature
io.on("connection", (socket) => {
  console.log("a user connected");

  // Handle receiving a chat message
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);  // Broadcast the message to all connected users
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Set the port from the environment variables or use 5000 by default
const PORT = process.env.PORT || 5000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
