import { FC, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { useAppDispatch, useTypedSelector } from "../../services/store";
import { fetchIngredients } from "../../services/ingredients";
import { fetchUser } from "../../services/user";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import AppError from "./app-error";
import CommonFeed from "../../pages/common-feed";
import Home from "../../pages/home";
import Login from "../../pages/login";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import Profile from "../../pages/profile";
import ProfileMenu from "../../pages/profile-menu";
import ProfileFeed from "../../pages/profile-feed";
import IngredientDetails from "../ingredient-details/ingredient-details";
import IngredientModal from "../ingredient-details/ingredient-modal";
import { AuthenticatedOnly, AnonymousOnly } from "../protected-route";
import OrderDescriptionModal from "../order-description/order-description-modal";
import OrderPage from "../../pages/order-page";

export const App: FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchIngredients());
    }, [dispatch]);

    const { request, requestError } = useTypedSelector(state => state.burgerIngredients);

    const location = useLocation();
    const state = location.state;
    return (
        <div className={styles.app}>
            {!request && !requestError &&
                <>
                    <AppHeader />
                    <main className={styles.main}>
                        <Routes location={state?.backgroundLocation || location}>
                            <Route path="/" element={<Home />} />
                            <Route path="/feed" element={<CommonFeed />} />
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
                            <Route path="profile" element={<ProfileMenu />}>
                                <Route index element={<AuthenticatedOnly component={<Profile />} />} />
                                <Route path="orders" element={<AuthenticatedOnly component={<ProfileFeed />} />} />
                            </Route>
                            <Route path="/ingredients/:id" element={<IngredientDetails />} />
                            <Route path="/feed/:orderNumber" element={<OrderPage />} />
                            <Route path="/profile/orders/:orderNumber" element={<OrderPage />} />
                            <Route path="*" element={<AppError />} />
                        </Routes>
                        {state?.backgroundLocation && (
                            <Routes>
                                <Route path="/ingredients/:id" element={<IngredientModal />} />
                                <Route path="/feed/:orderNumber" element={<OrderDescriptionModal />} />
                                <Route path="/profile/orders/:orderNumber" element={<OrderDescriptionModal />} />
                            </Routes>
                        )}
                    </main>
                </>
            }
            {!request && requestError &&
                <AppError />
            }
        </div>
    );
}

export default App;
