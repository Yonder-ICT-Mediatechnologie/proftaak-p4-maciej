import { useEffect, useState } from "react";
import api from "../axiosConfig";
import { handleResponse } from "../Functions";
import { RoomController } from "../controllers/roomController";

function Component() {
    const [myRooms, setMyRooms] = useState<Room[]>([]);

    const getMyRooms = async () => {
        const response = await api.post("/room/myRooms");
        handleResponse(response);
        setMyRooms(response.data.rooms);
    };

    useEffect(() => {
        getMyRooms();
    }, []);

    return (
        <div>
            <h2 style={{ margin: 0 }}>Rooms</h2>
            <div
                style={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    overflowY: "auto",
                    maxHeight: "200px",
                }}
            >
                {myRooms.map((room, index) => (
                    <div
                        key={index}
                        style={{
                            padding: "10px",
                            borderRadius: "5px",
                            backgroundColor: "var(--primary-color)",
                            cursor: "pointer",
                            transition: "background-color 0.25s",
                        }}
                        onClick={() => RoomController.Room.Set(room)}
                    >
                        {room.Name}
                    </div>
                ))}
            </div>
            <button onClick={getMyRooms} style={{ marginTop: "10px" }}>
                Refresh
            </button>
        </div>
    );
}

export default Component;
