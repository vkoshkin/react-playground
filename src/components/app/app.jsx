import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { fetchIngredients } from "../../services/ingredients";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import AppError from "./app-error";
import Home from "../../pages/home";
import Login from "../../pages/login";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import Profile from "../../pages/profile";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchIngredients())
    }, []);

    const location = useLocation();
    const state = location.state;
    return (
        <div className={styles.app}>
            <AppHeader />
            <main className={styles.main}>
                <DndProvider backend={HTML5Backend}>
                    <Routes location={state?.backgroundLocation || location}>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="*" element={<AppError />} />
                    </Routes>
                </DndProvider>
            </main>
        </div>
    );
}

export default App;
