import { useEffect, useState } from "react";
import { getLocalStorage } from "../Functions";
import CreateRoomForm from "../components/CreateRoomForm";
import MyRoomList from "../components/MyRoomList";
import Room from "../components/Room";

function Home() {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const user = getLocalStorage("user");
        if (user) setUser(user);
    }, []);

    // const handleSubmit = async (e: React.FormEvent) => {
    //   e.preventDefault();
    // };

    return (
        <>
            <div
                style={{
                    width: "100vw",
                    display: "flex",
                }}
            >
                <div style={{ width: "10px" }} />

                <div>
                    <div style={{ height: "50px" }} />

                    <CreateRoomForm />

                    <div style={{ height: "50px" }} />
                    <MyRoomList />
                </div>

                <div style={{ height: "50px", width: "50px" }} />

                <Room />
            </div>
        </>
    );
}

export default Home;
