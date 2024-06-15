import { Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppError from "./app-error";
import Home from "../../pages/home";
import Login from "../../pages/login";

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<AppError />} />
            </Routes>
        </DndProvider>
    );
}

export default App;
