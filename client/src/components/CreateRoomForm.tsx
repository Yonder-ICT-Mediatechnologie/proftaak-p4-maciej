import { useState } from "react";
import api from "../axiosConfig";
import { handleResponse } from "../Functions";

function Component() {
    const [roomName, setRoomName] = useState("");
    const [isPublic, setIsPublic] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await api.post("/room/create", { roomName, isPublic });
        handleResponse(response);
        // console.log(roomName, isPublic);
    };

    return (
        <div
            style={{
                width: "100%",
            }}
        >
            <h2>Create Room</h2>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <input
                    type="text"
                    placeholder="Chat Room Name"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                />
                <label>
                    Make it public:
                    <input
                        type="checkbox"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}
                    />
                </label>
                <input type="submit" value="Create Chat Room" />
            </form>
        </div>
    );
}

export default Component;
