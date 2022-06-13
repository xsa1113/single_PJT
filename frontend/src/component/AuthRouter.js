import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Users } from './Login/User';
import { useNavigate, useLocation } from "react-router-dom";
import { loginCheck } from '../store/users';
const AuthRouter = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        loginCheckFunc();
    }, []);
    const loginCheckFunc = async () => {
        const isLogin = await dispatch(loginCheck()).unwrap();
        isLogin ? toGo() : toHome();
    };
    const toHome = () => {
        const from =
            location.pathname === "/login" || location.pathname === "/join" //
                ? location.pathname
                : "/login";
        navigate(from);
    };
    const toGo = () => {
        const from = location.pathname || "/";
        console.log(location.pathname);
        navigate(from === "/login" || from === "/join" ? "/" : from);
    };
    return <></>;
};

export default AuthRouter;