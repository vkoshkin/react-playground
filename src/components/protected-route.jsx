import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ authenticatedOnly, component }) => {
    const { user, userChecked } = useSelector(store => store.user);
    const location = useLocation();

    if (!userChecked) {
        return <p>Загрузка...</p>;
    }
    if (!authenticatedOnly && user) {
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }
    if (authenticatedOnly && !user) {
        return <Navigate to={"/login"} state={{ from: location }} />;
    }
    return component;
};

export const AuthenticatedOnly = ({ component }) => <ProtectedRoute authenticatedOnly={true} component={component} />
export const AnonymousOnly = ({ component }) => <ProtectedRoute authenticatedOnly={false} component={component} />
