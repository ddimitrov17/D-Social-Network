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
            const socket = io("http://localhost:5000", {
                query: {
                    userId: user._id,
                },
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