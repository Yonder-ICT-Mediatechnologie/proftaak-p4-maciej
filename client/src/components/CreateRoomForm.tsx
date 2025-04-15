import { useState } from "react";
import api from "../axiosConfig";
import { handleResponse } from "../Functions";

function Component() {
    const [roomName, setRoomName] = useState("");
    const [isPublic] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setRoomName("")
        const response = await api.post("/room/create", { roomName, isPublic });
        handleResponse(response);
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
            <h2 style={{ margin: 0 }}>Create Room</h2>
            <input
                type="text"
                placeholder="Room Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid var(--border-color)",
                    backgroundColor: "var(--primary-color)",
                    color: "var(--color)",
                }}
            />
            {/* <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                />
                Make it public (doesn't work yet)
            </label> */}
            <button type="submit">Create</button>
        </form>
    );
}

export default Component;
