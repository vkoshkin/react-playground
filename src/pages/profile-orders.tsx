import { FC, useEffect } from "react";

import { useAppDispatch, useTypedSelector } from "../services/store";
import { WebSocketStatus, WS_PROFILE_URL } from "../utils/websockets";
import { profileWsConnect, profileWsDisconnect } from "../services/profile-feed";
import styles from "./profile-orders.module.css";

const ProfileOrders: FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(profileWsConnect(WS_PROFILE_URL));
        return () => {
            dispatch(profileWsDisconnect());
        };
    }, []);

    const { status, orders } = useTypedSelector(store => store.profileFeed);

    return (
        <div className={styles.orders}>
            {(status !== WebSocketStatus.ONLINE || orders.length === 0) &&
                <div className={styles.loading}>
                    <div>
                        <div className="loader"></div>
                    </div>
                </div>
            }
            {status === WebSocketStatus.ONLINE &&
                <></>
            }
        </div>
    );
}

export default ProfileOrders;
