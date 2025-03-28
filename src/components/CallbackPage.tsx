import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONFIG } from '../utils/constants';


const CallbackPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const verifier = localStorage.getItem(CONFIG.pkce_verifier);

    if (code && verifier) {
      let url = `${process.env.BACKEND_URL}/kick/login/exchange-code`;

      axios.post(url, {
        authorizationCode: code,
        codeVerifier: verifier,
      }).then((res) => {
        console.log('Access token:', res.data.access_token);
        localStorage.setItem(CONFIG.accessToken, res.data.access_token);
        navigate('/');
      }).catch((err) => {
        console.error('Token exchange error:', err);
      });

    }
  }, [navigate]);

  return <p>Authenticating with Kick...</p>;
};

export default CallbackPage;
