import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ authenticatedOnly, component }) => {
    const { user, userChecked } = useSelector(store => store.user);
    const location = useLocation();

    if (!userChecked) {
        return <p>Загрузка...</p>;
    }

    console.log(`${JSON.stringify(user)}; ${JSON.stringify(authenticatedOnly)}`);

    if (!authenticatedOnly && user) {
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={"/"} />;
    }
    if (authenticatedOnly && !user) {
        return <Navigate to={"/login"} state={{ from: location }} />;
    }
    return component;
};

export const AuthenticatedRoute = ({ component }) => <ProtectedRoute authenticatedOnly={true} component={component} />
export const AnonymousRoute = ({ component }) => <ProtectedRoute authenticatedOnly={false} component={component} />
