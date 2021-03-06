import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import { Users } from '../component/Login/User';
import { checkId, getUserById, getUserByKey, getUserByUserId, loginApi, loginCheckApi, logoutApi, postUser, putUsers } from './usersApi';

const initialState = {
    user:Users,
    myId: localStorage.getItem("token"),
    isLogin: localStorage.getItem("token") === undefined ? true : false,
    me: {},
};

const CHECK_ID = "CHECK_ID";
const LOGIN_CHECK = "LOGIN_CHECK";
const LOGIN = "LOGIN";
const INSERT_USER = "INSERT_USER";
const SELECT_USER_BY_ID = "SELECT_USER_BY_ID";
const SELECT_USER_BY_USERID = "SELECT_USER_BY_USERID";
const LOGOUT = "LOGOUT";
const UPDATE_USERS = "UPDATE_USERS";
const SELECT_USER_BY_KEY = "SELECT_USER_BY_KEY";

export const getCheckId = createAsyncThunk(CHECK_ID, async (userId, thunkAPI) => {
    const { users } = thunkAPI.getState.users;
    return await checkId(users, userId);
});

export const loginCheck = createAsyncThunk(LOGIN_CHECK, async (payload, thunkAPI) => {
    const { users, myId } = thunkAPI.getState().users;
    if (myId) {
        const me = await loginCheckApi(users, Number(myId));
        return me;
    } else if (myId === 0 || myId === "0") {
        const me = await loginCheckApi(users, Number(myId));
        return me;
    }
    return;
});

export const login = createAsyncThunk(LOGIN, async (user, thunkAPI) => {
    //console.log 에 user와 users를 찍어보기 어떻게 데이터값이 들어가는지
    const { users } = thunkAPI.getState().users;
    const isLogin = await loginApi(users, user);
    return isLogin;
});

export const insertUser = createAsyncThunk(INSERT_USER, async (user, thunkAPI) => {
    // const 안에 있는 users와 getstate해서 얻어온 users와의 차이점
    const { users } = thunkAPI.getState().users;
    const newUser = await postUser(users, user);
    return newUser;
});
export const selectUserById = createAsyncThunk(SELECT_USER_BY_ID, async (id, thunkAPI) => {
    const { users } = thunkAPI.getState().users;
    const newUser = await getUserById(users, id);
    return newUser;
});

export const selectUserByUserId = createAsyncThunk(SELECT_USER_BY_USERID, async (userId, thunkAPI) => {
    const { users } = thunkAPI.getState().users;
    const newUser = await getUserByUserId(users, userId);
    return newUser;
});

export const logout = createAsyncThunk(LOGOUT, async (payload, thunkAPI) => {
    const { myId } = thunkAPI.getState().users;
    const isLogout = await logoutApi(myId);
    return isLogout;
});
export const updateUsers = createAsyncThunk(UPDATE_USERS, async (user, thunkAPI) => {
    const { myId, users } = thunkAPI.getState().users;
    const newUsers = await putUsers(users, user, myId);
    return { newUsers, user };
});
export const selectUserByKey = createAsyncThunk(SELECT_USER_BY_KEY, async (key, thunkAPI) => {
    const { users } = thunkAPI.getState().users;
    const reg = new RegExp(key, "g");
    const newUsers = await getUserByKey(users, reg);

    return newUsers.id;
});

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginCheck.fulfilled, (state, { payload }) => {
                if (payload) {
                    return { ...state, isLogin: true, me: payload };
                } else {
                    return { ...state, isLogin: false };
                }
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                if (payload.isLogin) {
                    localStorage.setItem("token", payload.user.token);
                    return { ...state, isLogin: payload.login, me: payload.user};
                } else {
                    return { ...state, isLogin: false };
                }
            })
            .addCase(insertUser.fulfilled, (state, { payload }) => {
                return { ...state, users: payload };
            })
            .addCase(logout.fulfilled, (state, { payload }) => {
                localStorage.removeItem("token");
                return { ...state, isLogin: false, me: {}, myId: "" };
            })
            .addCase(updateUsers.fulfilled, (state, { payload }) => {
                const { newUsers, user } = payload;

                return { ...state, me: { ...state.me, ...user }, users: newUsers };
            });
    },
});


export default usersSlice.reducer;