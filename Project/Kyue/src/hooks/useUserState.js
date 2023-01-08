import { useDispatch, useSelector } from "react-redux";

const useUserState = () => {
    // const userState = useSelector((state) => state.user)
    // const dispatcher = useDispatch();
    // console.log('userState :>> ', userState);
    return {
        user: {
            get currentUser() {
                return JSON.parse(localStorage.getItem("user"));
            },
            get id() {
                return JSON.parse(localStorage.getItem("user")).id;
            },
            get sessionId() {
                return JSON.parse(localStorage.getItem("user")).sessionId;
            },
            get isAuthenticated() {
                const user = JSON.parse(localStorage.getItem("user"));
                return user.id && user.sessionId;
            },
        },
    };
};

export default useUserState;