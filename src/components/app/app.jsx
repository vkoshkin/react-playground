import { Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppError from "./app-error";
import Home from "../../pages/home";
import Login from "../../pages/login";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="*" element={<AppError />} />
            </Routes>
        </DndProvider>
    );
}

export default App;
