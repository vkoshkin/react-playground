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

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchIngredients()); 
        dispatch(fetchUser());
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
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/forgot-password" element={<ForgotPassword />} />
                                <Route path="/reset-password" element={<ResetPassword />} />
                                <Route path="/profile" element={<Profile />} />
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
