import { useEffect, useState } from "react";
import api from "../axiosConfig";
import { handleResponse } from "../Functions";
import { RoomController } from "../controllers/roomController";
import { SocketController } from "../controllers/SocketControlles";

function Component() {
    const [room, setRoom] = useState<Room>();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        handleResponse(await api.post("/room/send", { roomId: room!.Id, message }));
    };

    const fetchMessages = async (room: Room) => {
        setMessages([]);
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

        SocketController.Socket.on("message", (msg: Message) => {
            setMessages((prev) => [...prev, msg]); // Append to array
            console.log(msg);
        });

        return () => {
            SocketController.Socket.off("message");
        };
    }, []);

    // SocketController.Socket.on("message", (message: Message) => {
    //     if (room && message.RoomId === room.Id) {
    //         console.log(messages)
    //         setMessages(() => {
    //             const newMessages = [...messages, message];
    //             console.log(newMessages);
    //             return newMessages;
    //         });
    //     }
    // });

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
            <div
                style={{ flex: 1, overflowY: "auto" }}
                ref={(div) => {
                    if (div) {
                        div.scrollTop = div.scrollHeight;
                    }
                }}
            >
                {messages
                    .sort(
                        (a, b) => new Date(a.Timestamp).getTime() - new Date(b.Timestamp).getTime(),
                    )
                    .map((message, index) => {
                        return (
                            <div key={index}>
                                <div
                                    style={{
                                        padding: "10px",
                                        borderRadius: "5px",
                                        backgroundColor: "var(--primary-color)",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <div
                                        style={{
                                            margin: 0,
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: "10px",
                                        }}
                                    >
                                        {message.Username}
                                        <div style={{ fontSize: "12px", color: "#888" }}>
                                            {new Date(message.Timestamp).toLocaleString("nl-NL", {
                                                day: "numeric",
                                                month: "numeric",
                                                year: "numeric",
                                            })}{" "}
                                            {new Date(message.Timestamp).toLocaleTimeString(
                                                "nl-NL",
                                                {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                },
                                            )}
                                        </div>
                                    </div>
                                    <div style={{ margin: 0 }}>{message.Content}</div>
                                </div>
                            </div>
                        );
                    })}
            </div>

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
