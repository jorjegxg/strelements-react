import React from 'react';
import { authUrl, pkce_verifier, scopes } from '../utils/constants';
import { generateCodeChallenge, generateCodeVerifier } from '../utils/functions';
import ReactZus from './CompZus';
require('dotenv').config();



const LoginWithKick: React.FC = () => {
  const login = async () => {
    const verifier = generateCodeVerifier();
    localStorage.setItem(pkce_verifier, verifier);

    const codeChallenge = await generateCodeChallenge(verifier);


    const clientId = process.env.KICK_CLIENT_ID!;
    const scope = scopes;
    const state = '<random_value>';


    const redirect_uri = `https://react-strelements-84c0b2fe9694.herokuapp.com/callback`;

    console.log('redirect_uri:', redirect_uri);

    const url = new URL(authUrl);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('client_id', clientId!);
    url.searchParams.set('redirect_uri', redirect_uri);
    url.searchParams.set('scope', scope);
    url.searchParams.set('code_challenge', codeChallenge);
    url.searchParams.set('code_challenge_method', 'S256');
    url.searchParams.set('state', state);

    console.log("url sent to kick:", url.toString());

    console.log('CLIENT_ID:', process.env.KICK_CLIENT_ID ? 'Exists' : 'Not Found');



    console.log('Params sent to Kick:', url.searchParams.toString());



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
