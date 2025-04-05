import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";




function StrelementsPage() {
  const [messages, setMessages] = useState<string[]>([]);
  
  useEffect(() => {
    const socket = io(process.env.WEBSOKET_URL);
    socket.on("message", (data) => {
      console.log("Received message:", data.content);
      setMessages((prevMessages) => [...prevMessages, data.content]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

 


  return (
    <div>
      
      <h1>WebSocket Chat</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <div className="App">
      </div>
      
    </div>
    
  );
}

export default StrelementsPage;
