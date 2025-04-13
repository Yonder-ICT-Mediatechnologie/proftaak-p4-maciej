import { useState, useRef, useEffect } from "react";
import api from "../axiosConfig";
import { handleResponse } from "../Functions";

type MyComponentProps = {
  onUserClick: (user: User) => void
};

const UserSearch: React.FC<MyComponentProps> = ({ onUserClick }) => {
    const [userQuery, setUserQuery] = useState<User[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setShowSuggestions(false);
        }

    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={searchRef}
            style={{
                position: "relative",
                width: "100%",
            }}
        >
            <input
                type="text"
                placeholder="Search for Users"
                style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    boxSizing: "border-box",
                }}
                onInput={async (e) => {
                    const input = (e.target as HTMLInputElement).value;

                    // if (input.trim() === '') {
                    //     setUserQuery([]);
                    //     setShowSuggestions(false);
                    //     return;
                    // }

                    const response = await api.post("/request/userSearch", { input });
                    const success = handleResponse(response);
                    if (success) {
                        setUserQuery(response.data.result);
                        setShowSuggestions(true);
                    }
                }}
                onFocus={() => setShowSuggestions(true)}
            />
            {showSuggestions && userQuery.length > 0 && (
                <div
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        width: "100%",
                        backgroundColor: "#1a1a1a",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        zIndex: 1000,
                        maxHeight: "200px",
                        overflowY: "auto",
                    }}
                >
                    {userQuery.map((user, index) => (
                        <div
                            key={index}
                            style={{
                                padding: "10px",
                                cursor: "pointer",
                                borderBottom: "1px solid #f0f0f0",
                            }}
                            onClick={() => {
                                setShowSuggestions(false);
                                // alert(`Selected: ${user.Username}#${user.UsernameId}`);
                                onUserClick(user)
                            }}
                        >
                            {`${user.Username}#${user.UsernameId}`}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default UserSearch;
