import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { fetchIngredients } from "../../services/ingredients";
import { fetchUser } from "../../services/user";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import AppError from "./app-error";
import Home from "../../pages/home";
import Login from "../../pages/login";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import Profile from "../../pages/profile";
import IngredientDetails from "../burger-ingredients/ingredient-details";
import IngredientModal from "../burger-ingredients/ingredient-modal";
import { AuthenticatedOnly, AnonymousOnly } from "../protected-route";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchIngredients());
    }, []);

    const { request, requestError } = useSelector(state => state.burgerIngredients);

    const location = useLocation();
    const state = location.state;
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.app}>
                {!request && !requestError &&
                    <>
                        <AppHeader />
                        <main className={styles.main}>
                            <Routes location={state?.backgroundLocation || location}>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={
                                    <AnonymousOnly component={<Login />} />
                                } />
                                <Route path="/register" element={
                                    <AnonymousOnly component={<Register />} />
                                } />
                                <Route path="/forgot-password" element={
                                    <AnonymousOnly component={<ForgotPassword />} />
                                } />
                                <Route path="/reset-password" element={
                                    <AnonymousOnly component={<ResetPassword />} />
                                } />
                                <Route path="/profile" element={
                                    <AuthenticatedOnly component={<Profile />} />
                                } />
                                <Route path="/ingredients/:id" element={<IngredientDetails />} />
                                <Route path="*" element={<AppError />} />
                            </Routes>
                            {state?.backgroundLocation && (
                                <Routes>
                                    <Route path="/ingredients/:id" element={<IngredientModal />} />
                                </Routes>
                            )}
                        </main>
                    </>
                }
                {!request && requestError &&
                    <AppError />
                }
            </div>
        </DndProvider>
    );
}

export default App;
