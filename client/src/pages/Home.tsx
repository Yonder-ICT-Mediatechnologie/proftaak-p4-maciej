import { useEffect, useState } from 'react';
import UserSearch from '../components/UserSearch';
import { getUser } from '../Functions';

function Home() {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const user = getUser();
        if (user) setUser(user);
    }, []);

    // const handleSubmit = async (e: React.FormEvent) => {
    //   e.preventDefault();
    // };

    return (
        <div>
            <UserSearch />
        </div>
    );
}

export default Home;
