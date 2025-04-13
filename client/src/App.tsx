import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import LoginRoute from "./components/LoggedInRoute";
import NotLoginRoute from "./components/NotLoggedInRoute";
import Nav from "./components/Nav";

function App() {
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route
                    path="/login"
                    element={
                        <NotLoginRoute>
                            <Login />
                        </NotLoginRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <NotLoginRoute>
                            <Register />
                        </NotLoginRoute>
                    }
                />
                <Route
                    path="/"
                    element={
                        <LoginRoute>
                            <Home />
                        </LoginRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
