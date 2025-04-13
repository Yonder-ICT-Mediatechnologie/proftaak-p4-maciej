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
        <div
            style={{
                // width: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <h2>Rooms:</h2>
            {myRooms.map((room, index) => {
                return (
                    <div
                        key={index}
                        style={{
                            padding: "10px",
                            cursor: "pointer",
                            borderBottom: "1px solid #f0f0f0",
                        }}
                        onClick={() => RoomController.Room.Set(room)}
                    >
                        {room.Name}
                    </div>
                );
            })}

            <button onClick={getMyRooms}>refresh</button>
        </div>
    );
}

export default Component;
