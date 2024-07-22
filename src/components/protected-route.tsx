import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useTypedSelector } from "../services/store";

export interface RouteProps {
    readonly component: ReactNode;
};

interface ProtectedRouteProps extends RouteProps {
    readonly authenticatedOnly: boolean;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ authenticatedOnly, component }) => {
    const { user, userChecked } = useTypedSelector(store => store.user);
    const location = useLocation();

    if (!userChecked) {
        return <p className="text text_type_main-default">Загрузка...</p>;
    }
    if (!authenticatedOnly && user) {
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }
    if (authenticatedOnly && !user) {
        return <Navigate to={"/login"} state={{ from: location }} />;
    }
    return (<>{component}</>);
};

export const AuthenticatedOnly: FC<RouteProps> = ({ component }) => <ProtectedRoute authenticatedOnly={true} component={component} />
export const AnonymousOnly: FC<RouteProps> = ({ component }) => <ProtectedRoute authenticatedOnly={false} component={component} />
