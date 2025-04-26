/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { io } from "socket.io-client";
import { CONFIG } from "../../../utils/constants";
import { useDasboardStore } from "../../dashboard/dashboardStore";
import { useCharacterStore } from "./characterStore";

const socket = io(process.env.WEBSOKET_URL!);

export const useSocketListener = () => {
  const addOrUpdateCharacter = useCharacterStore((state) => state.addOrUpdateCharacter);
  const setIsLive = useDasboardStore((state : any) => state.setIsLive);

  useEffect(() => {

    const clientId = localStorage.getItem(CONFIG.localStorage.user_id);
    socket.emit('join_room', clientId);

    socket.on("message", (data) => {
      console.log("Received message:", data);

      if(data.headers["kick-event-type"] === "chat.message.sent"){
        const userId = data.body.sender.user_id;
        const content = data.body.content;
        const name = data.body.sender.username;
        addOrUpdateCharacter(userId, content , name);

      }else if(data.headers["kick-event-type"] === "livestream.status.updated"){
        const isLive = data.body.is_live;
        console.log("Is live:", isLive);
        setIsLive(isLive);
      }



      

    });

    return () => {
      socket.off("message");
    };
  }, []);
};
