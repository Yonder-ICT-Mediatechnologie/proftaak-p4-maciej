import { useEffect, useState } from "react";
import api from "../axiosConfig";
import { handleResponse } from "../Functions";
import UserSearch from "./UserSearch";
import { RoomController } from "../controllers/roomController";

function Component() {
    const [room, setRoom] = useState<Room>();
    const [myRanks, setMyRanks] = useState<Ranks | undefined>();

    const getMyRanks = async (room: Room) => {
        setMyRanks(undefined);
        const response = await api.post("/room/myRanks", { roomId: room?.Id });
        if (!handleResponse(response)) return;
        setMyRanks(response.data.result);
    };

    useEffect(() => {
        const room = RoomController.Room.Value;
        if (room) {
            setRoom(room);
            getMyRanks(room);
        }

        RoomController.Room.Changed((value) => {
            if (value) {
                setRoom(value);
                getMyRanks(value);
            }
        });
    }, []);

    if (!room || !myRanks) return;

    return (
        <div
            style={{
                width: "100%",
            }}
        >
            <h1>{room.Name}</h1>

            <p>{`You are ${myRanks.IsAdmin === 0 ? "not" : ""} an admin and ${myRanks.IsOwner === 0 ? "not" : ""} an owner`}</p>

            {myRanks.IsAdmin === 1 && (
                <>
                    Add user{" "}
                    <UserSearch
                        onUserClick={async (user) => {
                            const response = await api.post("/room/addUser", {
                                userId: user.Id,
                                roomId: room.Id,
                            });
                            if (handleResponse(response))
                                alert(`Added user ${user.Username} to ${room.Name}`);
                        }}
                    />
                </>
            )}

            {myRanks.IsOwner === 1 && (
                <>
                    <button
                        onClick={async () => {
                            if (
                                confirm(
                                    `Are you sure you want to delete ${room.Name}? This cannot undone ಠ_ಠ`,
                                )
                            ) {
                                const response = await api.post("/room/delete", {
                                    roomId: room.Id,
                                });
                                if (handleResponse(response))
                                    alert(`Deleted ${room.Name} succesfully`);
                            }
                        }}
                    >
                        Delete server
                    </button>
                </>
            )}
        </div>
    );
}

export default Component;
