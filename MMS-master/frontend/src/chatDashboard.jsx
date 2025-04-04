import React, { useState } from "react";
import Chat from "/src/components/Chat";

const chatDashboard = ({ userId }) => {
  const [receiverId, setReceiverId] = useState("");

  return (
    <div>
      <h2>Dashboard</h2>
      <input
        type="text"
        placeholder="Enter Teacher/Student ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
      />
      {receiverId && <Chat userId={userId} receiverId={receiverId} />}
    </div>
  );
};

export default chatDashboard;
