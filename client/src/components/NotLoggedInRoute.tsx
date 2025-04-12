import React, { JSX, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axiosConfig';

const Component: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const [user, setUser] = useState<null | object>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/auth/me');
                const user = response.data.user;
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user));

                if (user) {
                    navigate('/');
                } else {
                    localStorage.removeItem('user');
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                setUser(null);
                navigate('/login');
            }
        };

        fetchUser();
    }, [navigate]);

    return children;
};

export default Component;
