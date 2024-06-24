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
import { AuthenticatedRoute, AnonymousRoute } from "../protected-route";

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
                                    <AnonymousRoute component={<Login />}>
                                    </AnonymousRoute>
                                } />
                                <Route path="/register" element={
                                    <AnonymousRoute component={<Register />}>
                                    </AnonymousRoute>
                                } />
                                <Route path="/forgot-password" element={
                                    <AnonymousRoute component={<ForgotPassword />}>
                                    </AnonymousRoute>
                                } />
                                <Route path="/reset-password" element={
                                    <AnonymousRoute component={<ResetPassword />}>
                                    </AnonymousRoute>
                                } />
                                <Route path="/profile" element={
                                    <AuthenticatedRoute component={<Profile />}>
                                    </AuthenticatedRoute>
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
