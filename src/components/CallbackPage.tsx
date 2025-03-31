import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppAuthStore } from '../assets/features/auth/appAuthStore';


const CallbackPage: React.FC = () => {
  const userLogin = useAppAuthStore((state) => state.userLogin);
  const navigate = useNavigate();

  useEffect(() => {
    userLogin().then(() => navigate('/'));
  }, []);

  return <p>Authenticating with Kick...</p>;
};

export default CallbackPage;
