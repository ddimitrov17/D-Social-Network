import { createContext, useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const user = useSelector(state => state.user.currentUser);

    useEffect(() => {
        if (user) {
            const socket = io(`${import.meta.env.VITE_BACKEND_URL}`, {
                query: {
                    userId: user._id,
                },
                withCredentials: true
            });

            setSocket(socket);

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [user]);

    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};