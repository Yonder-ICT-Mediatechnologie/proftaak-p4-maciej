import { useState } from 'react';
import api from '../axiosConfig';
import { handleResponse } from '../Functions';

function UserSearch() {
    const [userQuery, setUserQuery] = useState<User[]>([]);

    return (
        <div
            style={{
                height: '100%',
                width: '100%',
            }}
        >
            <input
                type="text"
                placeholder="Search for Users"
                onInput={async (e) => {
                    const input = (e.target as HTMLInputElement).value;

                    const response = await api.post("/request/userSearch", { input })
                    const succes = handleResponse(response)
                    if (succes) setUserQuery(response.data.result)

                }}
            />
            {userQuery.map((user, index) => (
                <div key={index}>{`${user.Username}#${user.UsernameId}`}</div>
            ))}
        </div>
    );
}

export default UserSearch;
