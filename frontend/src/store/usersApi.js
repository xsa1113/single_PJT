import { customAxios } from '../http/CustomAxios';
import axios from 'axios';

export const loginCheckApi = async (users, id) => {
    return await customAxios("/user/check", "get");
};
  
export const getUserById = async (users, id) => {
    // const findUserById = await users.find((user) => user.id === id);
    // const response = await axios({
    //     url:`http://localhost:8000/user/${id}`,
    //     method:"get",
    //     headers:{
    //         Authorization:`Bearer ${localStorage.getItem('token')}`
    //     }
    // })
    return await customAxios(`/user/${id}`, 'get');
};
  
export const getUserByUserId = async (users, userId) => {
    const findUserByUserId = await users.find((user) => user.userId === userId);
    return findUserByUserId;
};

export const getUserByKey = async (users, key) => {
    const findUserByUserId = await users.find((user) => key.test(user.name));
    return findUserByUserId;
};

export const postUser = async (users, user) => {
    const newUser = { ...user, userId: user.id, id: users.length };
    
    return await customAxios('/user/' , 'post', newUser);
};
  
export const loginApi = async (users, user) => {
    // const checkUser = await users.find((data) => data.userId === user.id && data.password === user.password);
    const newUser = {...user, userId: user.id, id: null}
    const response = await axios({
        method:"post",
        data:newUser,
        url:"http://localhost:8000/user/login"
    });
    console.log(response.data);
    return { isLogin: response.data.token ? true : false, user: response.data };
};
  
export const checkId = async (users, userId) => {
    const isCheckId = (await users.find((user) => user.userId === userId)) ? true : false;
    return isCheckId;
};

export const logoutApi = async (userId) => {
    return true;
};

// putusers 한번 더보기
export const putUsers = async (users, user, id) => {
    const findUsersIndex = await users.findIndex((user) => user.id === id);
    const { name, img } = user;
    if (findUsersIndex === -1) {
        console.error("not found");
        return;
    }
    const newUsers = [...users];
    newUsers.splice(findUsersIndex, 1, { ...users[findUsersIndex], name, img });
    return newUsers;
};