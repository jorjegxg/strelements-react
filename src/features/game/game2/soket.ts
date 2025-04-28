/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { io } from "socket.io-client";
import { CONFIG } from "../../../utils/constants";
import { useDasboardStore } from "../../dashboardStore";
import { useCharacterStore } from "./characterStore";

const socket = io(process.env.WEBSOKET_URL!);

export const useSocketListener = () => {
  const addOrUpdateCharacter = useCharacterStore((state) => state.addOrUpdateCharacter);
  const setIsLive = useDasboardStore((state : any) => state.setIsLive);

  useEffect(() => {

    const userId = localStorage.getItem(CONFIG.localStorage.user_id);
    socket.emit('join_room', userId);


    socket.on("live" , (data) => {
      console.log("Socket.on('live') registered"); 
      console.log("Live data:", data);

      const isLive = data.body.is_live;
      console.log("Is live:", isLive);
      setIsLive(isLive);
    });

    socket.on("chat" , (data) => {
      console.log("Socket.on('chat') registered");

      
      const userId = data.body.sender.user_id;
      const content = data.body.content;
      const name = data.body.sender.username;
      addOrUpdateCharacter(userId, content , name);
    });




  

    return () => {
      socket.off("message");
    };
  }, []);
};
