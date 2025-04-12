import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axiosConfig';
import { getUser } from '../Functions';

function Nav() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const user = getUser();
        if (user) setUser(user);

        window.addEventListener('storage', () => setUser(getUser()));
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
            }}
        >
            {user === undefined ? (
                <>
                    <a href="/login">login</a>
                    <a href="/register">register</a>
                </>
            ) : (
                <>
                    <a href="/">home</a>
                    <a
                        onClick={() => {
                            api.delete('/auth/logout');
                            navigate('/login');
                        }}
                    >
                        log out
                    </a>

                    <span>{`user: ${user.Username}#${user.UsernameId}`}</span>
                </>
            )}
        </div>
    );
}

export default Nav;
