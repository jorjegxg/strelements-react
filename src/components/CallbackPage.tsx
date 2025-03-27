import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pkce_verifier } from '../utils/constants';


const CallbackPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log('code :', code);

    const verifier = localStorage.getItem(pkce_verifier);

    console.log('verifier din local storage :', verifier);


    if (code && verifier) {
      let url = `${process.env.BACKEND_URL}/kick/login/exchange-code`;
      console.log('url spre exchange code:', url);


      axios.post(url, {
        authorizationCode: code,
        codeVerifier: verifier,
      }).then((res) => {
        console.log('Access token:', res.data.access_token);
        navigate('/');
      }).catch((err) => {
        console.error('Token exchange error:', err);
      });



    }
  }, [navigate]);

  return <p>Authenticating with Kick...</p>;
};

export default CallbackPage;
