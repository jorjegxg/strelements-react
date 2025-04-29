// Viewer.tsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useChatSoket } from "../little_humans/soket";

export default function TestPage() {
  const { sessionId } = useParams();
  useChatSoket(sessionId!);

  useEffect(() => {
    console.log("sessionId", sessionId);
  });

  return <h2>mama</h2>;
}
