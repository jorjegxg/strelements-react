import React from 'react';
import { CONFIG } from '../utils/constants';
import { generateCodeChallenge, generateCodeVerifier } from '../utils/functions';



const LoginWithKick: React.FC = () => {
  // const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  // const login = useAuthStore((state) => state.login);
  // const logout = useAuthStore((state) => state.logout);

  // const isActive = useSwitchStore((state) => state.isActive);
  // const toggleState = useSwitchStore((state) => state.toggleState);


  const login = async () => {
    const verifier = generateCodeVerifier();
    localStorage.setItem(CONFIG.pkce_verifier, verifier);
    const codeChallenge = await generateCodeChallenge(verifier);

    const clientId = process.env.KICK_CLIENT_ID!;
    const scope = CONFIG.scopes;
    const state = '<random_value>';

    const redirect_uri = `https://react-strelements-84c0b2fe9694.herokuapp.com/callback`;

    console.log('redirect_uri:', redirect_uri);

    const url = new URL(CONFIG.authUrl);
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
      {/* {isAuthenticated ? (
        <button onClick={logout} >Logout</button>
      ) : (
        <button onClick={login} >Login</button>
      )}

      <button
        onClick={toggleState}
        className={`px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
      >
        {isActive ? 'ON' : 'OFF'}
      </button> */}
    </>

  );
};

export default LoginWithKick;
