import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Game() {
  const [messages, setMessages] = useState<
    { content: string; senderId: string }[]
  >([]);

  const [user_id, setUserId] = useState<number>(0);
  const [lastMessage, setLastMessage] = useState<string>("");

  useEffect(() => {
    const socket = io(process.env.WEBSOKET_URL);
    socket.on("message", (data) => {
      console.log("Received message:", data.content);
      console.log("sender:", data.sender.user_id);
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: data.content, senderId: data.sender.user_id },
      ]);
      setUserId(data.sender.user_id);
      setLastMessage(data.content);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <div className="bg-transparent">
      <h1>WebSocket Chat</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg.content}</p>
        ))}
      </div>
      <div className="App"></div>
      <div className="flex flex-col items-center justify-center">
        <div className=" w-screen relative overflow-hidden"></div>
        <Character
          name={"Mama"}
          zIndex={1}
          id={123}
          currentMessageUserId={user_id}
          message={lastMessage}
        />
        <Character
          name={"Tata"}
          zIndex={2}
          id={124}
          currentMessageUserId={user_id}
          message={lastMessage}
        />
        <Character
          name={"Teo"}
          zIndex={3}
          id={125}
          currentMessageUserId={user_id}
          message={lastMessage}
        />
      </div>
    </div>
  );
}

const Character = ({
  name,
  zIndex,
  id,
  currentMessageUserId,
  message,
}: {
  name: string;
  zIndex: number;
  id: number;
  currentMessageUserId: number;
  message: string;
}) => {
  const maxMove = 250;
  const controls = useAnimation();

  useEffect(() => {
    const move = () => {
      const randomX = Math.floor(Math.random() * maxMove);
      controls.start({
        x: randomX,
        transition: { duration: 2, ease: "easeInOut" },
      });
    };

    move();

    const interval = setInterval(() => {
      move();
    }, 2000);

    return () => clearInterval(interval);
  }, [controls, maxMove]);

  return (
    <div className="relative flex justify-center items-center">
      {/* Label pentru caracter */}

      {currentMessageUserId === id && (
        //container pentru mesaj

        <motion.div
          animate={controls}
          className={`absolute top-[-140px] bg-white p-4 rounded-lg shadow-md z-${zIndex} min-w-[250px] max-w-[350px] border-1`} // Padding mai mare și lățime ajustată
        >
          <p className="text-black font-semibold text-lg">{message}</p>{" "}
          {/* Dimensiune text mai mare */}
        </motion.div>
      )}

      <motion.p
        animate={controls}
        className={
          "absolute top-[-70px] text-lg font-semibold text-black" + ` z-10`
        }
      >
        {name}
      </motion.p>

      <motion.div
        animate={controls}
        className={
          "w-20 h-20 bg-blue-500 rounded-full absolute top-1/2 -translate-y-1/2 border-4 border-blue-700 shadow-lg" +
          ` z-${zIndex}`
        }
      />
    </div>
  );
};
