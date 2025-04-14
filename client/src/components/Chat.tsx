import { useEffect, useState } from "react";
import api from "../axiosConfig";
import { handleResponse } from "../Functions";
import { RoomController } from "../controllers/roomController";

function Component() {
    const [room, setRoom] = useState<Room>();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        handleResponse(await api.post("/room/send", { roomId: room!.Id, message }));
        setMessage("")
    };

    const fetchMessages = async (room: Room) => {
        const response = await api.post("/room/getChat", { roomId: room!.Id });
        handleResponse(response);
        setMessages(response.data.result);
    };

    useEffect(() => {
        const room = RoomController.Room.Value;
        if (room) {
            setRoom(room);
            fetchMessages(room);
        }

        RoomController.Room.Changed((room) => {
            if (room) {
                setRoom(room);
                fetchMessages(room);
            }
        });
    }, []);

    if (!room) return;

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div style={{ flex: 1, overflowY: "auto" }}>
                {messages.map((message, index) => {
                    return <div key={index}>{`${message.Username}: ${message.Content}`}</div>;
                })}
            </div>

            <button onClick={() => fetchMessages(room)}>Refresh (temporary dw)</button>

            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    width: "100%",
                    position: "sticky",
                    bottom: 0,
                    padding: "10px",
                    boxSizing: "border-box",
                }}
            >
                <input
                    type="text"
                    placeholder="Message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ flex: 1, marginRight: "10px" }}
                />
                <button
                    type="submit"
                    disabled={message !== undefined && (message === "" || message.length > 150)}
                >
                    Send
                </button>
            </form>
        </div>
    );
}

export default Component;
