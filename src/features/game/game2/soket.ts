import { useEffect } from "react";
import { io } from "socket.io-client";
import { useCharacterStore } from "./characterStore";

const socket = io(process.env.WEBSOKET_URL!);

export const useSocketListener = () => {
  const addOrUpdateCharacter = useCharacterStore((state) => state.addOrUpdateCharacter);

  useEffect(() => {
    socket.on("message", (data) => {
      const userId = data.sender.user_id;
      const content = data.content;
      const name = data.sender.username;

      addOrUpdateCharacter(userId, content , name);
    });

    return () => {
      socket.off("message");
    };
  }, []);
};
