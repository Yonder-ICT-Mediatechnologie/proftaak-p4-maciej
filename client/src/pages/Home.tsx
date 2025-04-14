import CreateRoomForm from "../components/CreateRoomForm";
import MyRoomList from "../components/MyRoomList";
import Room from "../components/Chat";
import SectionRight from "../components/SectionRight";

function Home() {
    return (
        <div className="container">
            <div className="section section-left">
                <CreateRoomForm />
                <div style={{ marginTop: "20px" }}>
                    <MyRoomList />
                </div>
            </div>
            <div className="section section-middle">
                <Room />
            </div>
            <div className="section section-right">
                <SectionRight />
            </div>
        </div>
    );
}

export default Home;
