/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { io } from "socket.io-client";
import { CONFIG } from "../../shared/utils/constants";
import { useDasboardStore } from "../dashboard/dashboardStore";
import { useCharacterStore } from "./characterStore";

const socket = io(process.env.WEBSOKET_URL!);

const useChatSoket = () => {
  const addOrUpdateCharacter = useCharacterStore(
    (state) => state.addOrUpdateCharacter
  );

  useEffect(() => {
    const userId = localStorage.getItem(CONFIG.localStorage.kickUserId);
    socket.emit("join_room", userId);

    socket.on("chat", (data) => {
      console.log("Socket.on('chat') registered");
      console.log("Chat data:", data);

      const userId = data.body.sender.user_id;
      const content = data.body.content;
      const name = data.body.sender.username;
      addOrUpdateCharacter(userId, content, name);
    });

    return () => {
      socket.off("chat");
    };
  }, []);
};
const useLiveSoket = () => {
  const setIsLive = useDasboardStore((state: any) => state.setIsLive);

  useEffect(() => {
    const userId = localStorage.getItem(CONFIG.localStorage.kickUserId);
    socket.emit("join_room", userId);

    socket.on("live", (data) => {
      console.log("Socket.on('live') registered");
      console.log("Live data:", data);

      const isLive = data.body.is_live;
      console.log("Is live:", isLive);
      setIsLive(isLive);
    });

    return () => {
      socket.off("live");
    };
  }, []);
};

export { useChatSoket, useLiveSoket };
