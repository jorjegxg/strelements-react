import React from "react";
import {
  generateCodeChallenge,
  generateCodeVerifier,
} from "../../shared/utils/auth_functions";
import { CONFIG } from "../../shared/utils/constants";
import { useSwitchStore } from "../stores/switchStore";

const LoginWithKick: React.FC = () => {
  const isActive = useSwitchStore((state) => state.isActive);
  const isLoading = useSwitchStore((state) => state.isLoading);
  const toggleState = useSwitchStore((state) => state.toggleState);

  const login = async () => {
    const verifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(verifier);

    localStorage.setItem(CONFIG.localStorage.pkce_verifier, verifier);

    const redirect_uri = `${process.env.FRONTEND_URL}/callback`;

    const url = new URL(CONFIG.authUrl);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("client_id", CONFIG.clientId!);
    url.searchParams.set("redirect_uri", redirect_uri);
    url.searchParams.set("scope", CONFIG.scopes);
    url.searchParams.set("code_challenge", codeChallenge);
    url.searchParams.set("code_challenge_method", "S256");
    url.searchParams.set("state", "random_value");

    window.location.href = url.toString();
  };

  return (
    <>
      <div></div>

      <h1>Login with Kick</h1>
      <button onClick={login}>Login with Kick</button>

      <button onClick={toggleState}>
        {isLoading
          ? "Loading..."
          : isActive
          ? "Pornire abonare"
          : "Opreste abonarea"}
      </button>
    </>
  );
};

export default LoginWithKick;
