/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { io } from "socket.io-client";
import { CONFIG } from "../../shared/utils/constants";
import Logger from "../../shared/utils/Logger";
import { useDasboardStore } from "../dashboard/dashboardStore";
import { useCharacterStore } from "./characterStore";

const socket = io(process.env.WEBSOKET_URL!);

const useChatSoket = (sessionID: string) => {
  const addOrUpdateCharacter = useCharacterStore(
    (state) => state.addOrUpdateCharacter
  );

  useEffect(() => {
    Logger.log("Sunt in useChatSoket");

    // const userId = localStorage.getItem(CONFIG.localStorage.kickUserId);
    socket.emit("join_room", sessionID);

    socket.on("chat", (data) => {
      const userId = data.body.sender.user_id;
      const content = data.body.content;
      const name = data.body.sender.username;
      Logger.log("IN CHAT SOKET - data " + data);
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
      const isLive = data.body.is_live;

      setIsLive(isLive);
    });

    return () => {
      socket.off("live");
    };
  }, []);
};

export { useChatSoket, useLiveSoket };
