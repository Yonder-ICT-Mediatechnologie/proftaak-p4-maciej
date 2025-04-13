import { useEffect, useState } from "react";
import api from "../axiosConfig";
import { handleResponse } from "../Functions";
import UserSearch from "./UserSearch";
import { RoomController } from "../controllers/roomController";
import Chat from "./Chat";


function Component() {
    const [room, setRoom] = useState<Room>();
    const [myRanks, setMyRanks] = useState<Ranks>();

    const getMyRanks = async (room: Room) => {
        const response = await api.post("/room/myRanks", { roomId: room?.Id })
        if (!handleResponse(response)) return
        setMyRanks(response.data.result)
    }

    useEffect(() => {
        const room = RoomController.Room.Value
        if (room) {
            setRoom(room)
            getMyRanks(room)
        }

        RoomController.Room.Changed((value) => {
            if (value) {
                setRoom(value)
                getMyRanks(value)
            }
        })
    }, [])

    if (!room || !myRanks) return

    return (
        <div
            style={{
                width: "600px",
            }}
        >

            <h1>{room.Name}</h1>

            <p>{`You are ${myRanks.IsAdmin === 0 ? "not" : ""} an admin and ${myRanks.IsOwner === 0 ? "not" : ""} an owner`}</p>

            {myRanks.IsAdmin === 1 &&
                <>Add user <UserSearch onUserClick={async (user) => {
                    const response = await api.post("/room/addUser", {userId: user.Id, roomId: room.Id})
                    if (handleResponse(response)) alert(`Added user ${user.Username} to ${room.Name}`)
                }}/></>
            }

            <div>
                <Chat/>
            </div>
        </div>
    );
}

export default Component;
