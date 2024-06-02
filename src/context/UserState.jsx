import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const UserState = createContext();

export const UserStateProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const backendURL = "https://api.zealicon.in";
    const [userData, setUserData] = useState();
    const [modalState, setModalState] = useState(1);
    const [userVerified, setUserVerified] = useState(false);
    const [zealId, setZealId] = useState();
    const [fullname, setFullName] = useState();
    const [email, setEmail] = useState();

    const [alert, setAlert] = useState({
        isOpen: false,
        msg: "",
        status: "",
    });

    const alertUser = (msg, status) => {
        setAlert((prev) => {
            return { ...prev, isOpen: true, msg, status };
        });
        setTimeout(() => {
            setAlert((prev) => {
                return { ...prev, isOpen: false };
            });
        }, 4000);
    };

    // console.log("USERSTATE: ", userData);
    const token = localStorage.getItem("token");
    console.log(token);
    useEffect(() => {
        if (token) {
            axios.get(`https://api.zealicon.in/accounts/get_user_info?token=${token.trim()}`).then((res) => {
                setUserData(res);
                console.log("I am APi waala", res);
                setZealId(res?.data?.zeal_id);
                setFullName(res?.data?.fullname);
                setEmail(res?.data?.email);
            });
        }
    }, []);
    return (
        <UserState.Provider
            value={{
                setAlert,
                alertUser,
                alert,
                isOpen,
                handleOpen,
                handleClose,
                backendURL,
                setUserData,
                modalState,
                setModalState,
                userData,
                userVerified,
                setUserVerified,
                zealId,
                setZealId,
                fullname,
                setFullName,
                email,
                setEmail,
            }}
        >
            {children}
        </UserState.Provider>
    );
};

export const useUserState = () => {
    return useContext(UserState);
};
