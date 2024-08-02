import { FC, useEffect } from "react";

import { useAppDispatch, useTypedSelector } from "../services/store";
import { WebSocketStatus, WS_PROFILE_URL } from "../utils/websockets";
import { profileWsConnect, profileWsDisconnect } from "../services/profile-feed";
import styles from "./profile-feed.module.css";

const ProfileFeed: FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(profileWsConnect(WS_PROFILE_URL));
        return () => {
            dispatch(profileWsDisconnect());
        };
    }, [dispatch]);

    const { status, orders } = useTypedSelector(store => store.profileFeed);

    return (
        <div className={styles.orders}>
            {(status !== WebSocketStatus.ONLINE || orders.length === 0) &&
                <div className={styles.loading}>
                    <div className="loader" />
                </div>
            }
            {status === WebSocketStatus.ONLINE &&
                <ProfileFeed />
            }
        </div>
    );
}

export default ProfileFeed;
