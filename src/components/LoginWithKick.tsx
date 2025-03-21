import React from 'react';
import { authUrl, pkce_verifier, scopes } from '../utils/constants';
import ReactZus from './CompZus';

const generateCodeVerifier = (): string => {
  const array = new Uint32Array(56 / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec => dec.toString(16).padStart(2, '0')).join('');
};

const sha256 = async (plain: string): Promise<Uint8Array> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  return new Uint8Array(hashBuffer);
};

const base64UrlEncode = (buffer: Uint8Array): string => {
  return btoa(String.fromCharCode(...Array.from(buffer)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

const generateCodeChallenge = async (verifier: string): Promise<string> => {
  const hash = await sha256(verifier);
  return base64UrlEncode(hash);
};



const LoginWithKick: React.FC = () => {
  const login = async () => {
    const verifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(verifier);
    localStorage.setItem(pkce_verifier, verifier);


    const clientId = process.env.KICK_CLIENT_ID!;
    const scope = scopes;
    const state = '<random_value>';


    const redirect_uri = `${process.env.FRONTEND_URL!}/callback`;

    console.log('redirect_uri:', redirect_uri);

    const url = new URL(authUrl);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('client_id', clientId!);
    url.searchParams.set('redirect_uri', redirect_uri);
    url.searchParams.set('scope', scope);
    url.searchParams.set('code_challenge', codeChallenge);
    url.searchParams.set('code_challenge_method', 'S256');
    url.searchParams.set('state', state);

    console.log(verifier, codeChallenge);
    console.log(url.toString());


    window.location.href = url.toString();
  };

  return (
    <>
      <h1>Login with Kick</h1>
      <button onClick={login}>Login with Kick</button>
      <ReactZus />
    </>

  );
};

export default LoginWithKick;
