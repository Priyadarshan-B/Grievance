import api from "../../api/axios";

export const loginUser = async (credentials) => {

    const { data } = await api.post("/auth/login", credentials);

    return data;

};

export const googleLogin = async (accessToken) => {

    const { data } = await api.post("/auth/google", {
        access_token: accessToken
    });

    return data;

};

export const getProfile = async () => {

    const { data } = await api.get("/auth/profile");

    return data;

};