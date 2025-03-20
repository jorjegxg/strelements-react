import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CallbackPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const verifier = localStorage.getItem('pkce_verifier');

    if (code && verifier) {
      axios.post(process.env.KICK_EXCHANGE_CODE_URI!, {
        authorizationCode: code,
        codeVerifier: verifier,
      }).then((res) => {
        console.log('Access token:', res.data.access_token);
        // Aici poți salva token-ul în Zustand, localStorage, etc.
        navigate('/');
      }).catch((err) => {
        console.error('Token exchange error:', err);
      });
    }
  }, [navigate]);

  return <p>Authenticating with Kick...</p>;
};

export default CallbackPage;
